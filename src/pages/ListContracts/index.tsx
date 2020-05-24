import React, { useEffect, useState, useCallback } from 'react';
import { Ring } from 'react-awesome-spinners';
import { useLocation } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import Header from './components/Header';

import * as S from './styles';

interface IContracts {
  id: string;
  number: number;
  client: {
    name: string;
  };
  daily_total_price: number;
  formatted_price: string;
  created_at: string;
  formatted_created_at: string;
}

interface ISearchFormData {
  name: string;
}

const ListContracts: React.FC = () => {
  const [contracts, setContracts] = useState<IContracts[]>([]);
  const [pagesAvailable, setPagesAvailable] = useState(0);
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();

  const [page, setPage] = useState(() => {
    return Number(new URLSearchParams(search).get('page')) || 1;
  });
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    async function loadContracts(): Promise<void> {
      try {
        setLoading(true);
        const response = await api.get<IContracts[]>('/contracts', {
          params: { page, name: searchName },
        });

        const data = response.data.map(contract => {
          const date = new Date(contract.created_at);
          const dateFormated = date.toLocaleDateString('pt-BR');
          const dateTime = date.getHours();

          return {
            ...contract,
            formatted_created_at: `${dateFormated} - ${dateTime}h`,
            formatted_price: formatPrice(contract.daily_total_price),
          };
        });

        const totalCount = response.headers['x-total-count'];

        setPagesAvailable(Math.ceil(totalCount / 7));
        setContracts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadContracts();
  }, [page, searchName]);

  const handleSearchSubmit = useCallback(({ name }: ISearchFormData) => {
    setSearchName(name);
  }, []);

  const incrementPage = useCallback(() => {
    setPage(state => state + 1);
  }, []);

  const decrementPage = useCallback(() => {
    setPage(state => state - 1);
  }, []);

  return (
    <S.Container>
      <S.Content>
        <Header onSubmit={handleSearchSubmit} />

        {loading ? (
          <S.LoadingSpinnerContainer>
            <Ring size={100} color="#FBC131" />
          </S.LoadingSpinnerContainer>
        ) : (
          <S.Table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>NOME</th>
                <th>DATA DE RETIRADA</th>
                <th>DIÁRIA</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map(contract => (
                <S.ClientRow key={contract.id}>
                  <td>{contract.number}</td>
                  <td>{contract.client.name}</td>
                  <td>{contract.formatted_created_at}</td>
                  <td>{contract.formatted_price}</td>
                </S.ClientRow>
              ))}
            </tbody>
          </S.Table>
        )}
        <S.Pagination>
          <S.pageButton
            disabled={page === 1}
            onClick={decrementPage}
            type="button"
            icon={FiArrowLeft}
          />
          <S.pageButton
            disabled={page === pagesAvailable}
            onClick={incrementPage}
            type="button"
            icon={FiArrowRight}
          />
        </S.Pagination>
      </S.Content>
    </S.Container>
  );
};

export default ListContracts;
