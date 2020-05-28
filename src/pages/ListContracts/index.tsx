import React, { useEffect, useState, useCallback } from 'react';
import { Ring } from 'react-awesome-spinners';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import Header from './components/Header';

import * as S from './styles';
import { useToast } from '../../hooks/toast';

interface Contracts {
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

interface SearchFormData {
  name: string;
}

const ListContracts: React.FC = () => {
  const [contracts, setContracts] = useState<Contracts[]>([]);
  const [pagesAvailable, setPagesAvailable] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    name: StringParam,
  });

  const [page, setPage] = useState(() => {
    return query.page || 1;
  });
  const [searchName, setSearchName] = useState(() => {
    return query.name || '';
  });

  useEffect(() => {
    async function loadContracts(): Promise<void> {
      try {
        setLoading(true);
        const response = await api.get<Contracts[]>('/contracts', {
          params: { page, name: searchName || undefined },
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

        setQuery({ page, name: searchName || undefined });
        setPagesAvailable(Math.ceil(totalCount / 7));
        setContracts(data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca',
        });
      } finally {
        setLoading(false);
      }
    }

    loadContracts();
  }, [page, searchName, setQuery, addToast]);

  const handleSearchSubmit = useCallback(({ name }: SearchFormData) => {
    setSearchName(name);
  }, []);

  const incrementPage = useCallback(() => {
    setPage(state => state + 1);
  }, []);

  const decrementPage = useCallback(() => {
    setPage(state => (state !== 1 ? state - 1 : 1));
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
          contracts.length !== 0 && (
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
          )
        )}
        <S.Pagination>
          <S.pageButton
            disabled={page === 1}
            onClick={decrementPage}
            type="button"
            icon={FiArrowLeft}
          />
          <S.pageButton
            disabled={pagesAvailable === 0 || page === pagesAvailable}
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
