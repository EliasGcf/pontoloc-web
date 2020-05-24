import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { FiSearch, FiPlus, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { UInput } from '../../components/Form';
import IconButton from '../../components/IconButton';
import api from '../../services/api';

import * as S from './styles';

interface IContracts {
  id: string;
  number: number;
  client: {
    name: string;
  };
  daily_total_price: number;
  created_at: Date;
}

interface ISearchFormData {
  name: string;
}

const ListContracts: React.FC = () => {
  const [contracts, setContracts] = useState<IContracts[]>([]);
  const [pagesAvailable, setPagesAvailable] = useState(0);
  const { search } = useLocation();

  const [page, setPage] = useState(() => {
    return Number(new URLSearchParams(search).get('page')) || 1;
  });
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    async function loadContracts(): Promise<void> {
      const response = await api.get('/contracts', {
        params: { page, name: searchName },
      });

      const totalCount = response.headers['x-total-count'];

      setPagesAvailable(Math.ceil(totalCount / 7));
      setContracts(response.data);
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
        <S.Header>
          <S.Form onSubmit={handleSearchSubmit}>
            <UInput placeholder="Buscar" icon={FiSearch} name="name" />
            <IconButton
              type="submit"
              style={{ marginLeft: 16 }}
              icon={FiSearch}
            />
          </S.Form>

          <S.AddButton type="submit">
            <FiPlus size={24} />
            CADASTRAR
          </S.AddButton>

          <h1>Aluguéis</h1>
        </S.Header>

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
                <td>{contract.created_at}</td>
                <td>{`R$ ${contract.daily_total_price}`}</td>
              </S.ClientRow>
            ))}
          </tbody>
        </S.Table>

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
