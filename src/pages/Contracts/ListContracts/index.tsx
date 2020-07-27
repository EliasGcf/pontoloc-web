import React, { useEffect, useState, useCallback } from 'react';
import { Ring } from 'react-awesome-spinners';
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

import { formatPrice } from '../../../utils/format';
import { useToast } from '../../../hooks/toast';
import ChangePageButton from '../../../components/ChangePageButton';
import Header from '../../../components/Header';

import * as S from './styles';

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
  const [loading, setLoading] = useState(true);
  const [queryPage, setQueryPage] = useQueryParam('page', NumberParam);
  const [queryName, setQueryName] = useQueryParam('name', StringParam);

  const history = useHistory();
  const { addToast } = useToast();

  const handleSearchSubmit = useCallback(
    ({ name }: SearchFormData) => {
      setQueryPage(1);
      setQueryName(name || undefined);
    },
    [setQueryName, setQueryPage],
  );

  const incrementPage = useCallback(async () => {
    setQueryPage(state => (state || 1) + 1);
  }, [setQueryPage]);

  const decrementPage = useCallback(async () => {
    setQueryPage(state => (state || 2) - 1);
  }, [setQueryPage]);

  useEffect(() => {
    async function loadContracts(): Promise<void> {
      try {
        setLoading(true);
        const response = await api.get<Contracts[]>('/contracts', {
          params: {
            page: queryPage || 1,
            name: queryName || undefined,
          },
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
        addToast({
          type: 'error',
          title: 'Erro na busca',
        });
      } finally {
        setLoading(false);
      }
    }

    loadContracts();
  }, [addToast, queryName, queryPage]);

  if (loading) {
    return (
      <S.Container>
        <S.Content>
          <Header
            initialName={queryName}
            onSubmit={handleSearchSubmit}
            disabled
            createPage="/contracts/register"
            title="Aluguéis"
            placeholder="Digite o nome do cliente"
          />
          <S.MessageContainer>
            <Ring size={100} color="#FBC131" />
          </S.MessageContainer>
        </S.Content>
      </S.Container>
    );
  }

  if (contracts.length === 0) {
    return (
      <S.Container>
        <S.Content>
          <Header
            onSubmit={handleSearchSubmit}
            disabled={!queryName}
            createPage="/contracts/register"
            title="Aluguéis"
            placeholder="Digite o nome do cliente"
          />
          <S.MessageContainer>
            <span>Nenhum contrato foi encontrado.</span>
          </S.MessageContainer>
        </S.Content>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Content>
        <Header
          initialName={queryName}
          onSubmit={handleSearchSubmit}
          createPage="/contracts/register"
          title="Aluguéis"
          placeholder="Digite o nome do cliente"
        />

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
              <S.ClientRow
                key={contract.id}
                onClick={() => {
                  history.push(`/contracts/details/${contract.id}`);
                }}
              >
                <td>{contract.number}</td>
                <td>{contract.client.name}</td>
                <td>{contract.formatted_created_at}</td>
                <td>{contract.formatted_price}</td>
              </S.ClientRow>
            ))}
          </tbody>
        </S.Table>

        <S.Pagination>
          {!(queryPage === 1 || !queryPage) && (
            <ChangePageButton
              changePageTo="decrement"
              onClick={decrementPage}
            />
          )}
          {!(pagesAvailable <= 1 || queryPage === pagesAvailable) && (
            <ChangePageButton
              changePageTo="increment"
              onClick={incrementPage}
              style={{ marginLeft: 'auto' }}
            />
          )}
        </S.Pagination>
      </S.Content>
    </S.Container>
  );
};

export default ListContracts;
