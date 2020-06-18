import React, { useState, useCallback, useEffect } from 'react';
import { Ring } from 'react-awesome-spinners';
import { NumberParam, useQueryParam, StringParam } from 'use-query-params';

import ChangePageButton from '../../../components/ChangePageButton';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import Header from './components/Header';

import * as S from './styles';

interface Client {
  id: string;
  name: string;
  cpf: string;
  phone_number: string;
}

interface SearchFormData {
  name: string;
}

const ListClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagesAvailable, setPagesAvailable] = useState(0);
  const [queryPage, setQueryPage] = useQueryParam('page', NumberParam);
  const [queryName, setQueryName] = useQueryParam('name', StringParam);

  const { addToast } = useToast();

  const handleSearchSubmit = useCallback(
    ({ name }: SearchFormData, { reset }) => {
      setQueryName(name || undefined);
      reset();
    },
    [setQueryName],
  );

  const incrementPage = useCallback(() => {
    setQueryPage(state => (state || 1) + 1);
  }, [setQueryPage]);

  const decrementPage = useCallback(() => {
    setQueryPage(state => (state || 2) - 1);
  }, [setQueryPage]);

  useEffect(() => {
    async function loadClients(): Promise<void> {
      try {
        setLoading(true);

        const response = await api.get<Client[]>('/clients', {
          params: {
            page: queryPage || 1,
            name: queryName || undefined,
          },
        });

        const totalCount = response.headers['x-total-count'];

        setPagesAvailable(Math.ceil(totalCount / 7));
        setClients(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca',
        });
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, [addToast, queryName, queryPage]);

  if (loading) {
    return (
      <S.Container>
        <S.Content>
          <Header onSubmit={handleSearchSubmit} disabled />
          <S.MessageContainer>
            <Ring size={100} color="#FBC131" />
          </S.MessageContainer>
        </S.Content>
      </S.Container>
    );
  }

  if (clients.length === 0) {
    return (
      <S.Container>
        <S.Content>
          <Header onSubmit={handleSearchSubmit} disabled />
          <S.MessageContainer>
            <span>Nenhum cliente foi encontrado.</span>
          </S.MessageContainer>
        </S.Content>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Content>
        <Header onSubmit={handleSearchSubmit} />

        <S.Table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>CPF</th>
              <th>TELEFONE</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <S.ClientRow key={client.id}>
                <td>{client.name}</td>
                <td>{client.cpf}</td>
                <td>{client.phone_number}</td>
              </S.ClientRow>
            ))}
          </tbody>
        </S.Table>

        <S.Pagination>
          <ChangePageButton
            changePageTo="decrement"
            disabled={queryPage === 1 || !queryPage}
            onClick={decrementPage}
          />
          <ChangePageButton
            changePageTo="increment"
            disabled={pagesAvailable <= 1 || queryPage === pagesAvailable}
            onClick={incrementPage}
          />
        </S.Pagination>
      </S.Content>
    </S.Container>
  );
};

export default ListClients;
