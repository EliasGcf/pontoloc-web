import React, { useState, useCallback, useEffect } from 'react';
import { Ring } from 'react-awesome-spinners';
import { NumberParam, useQueryParam, StringParam } from 'use-query-params';
import { useHistory } from 'react-router-dom';

import Header from '../../../components/Header';
import ChangePageButton from '../../../components/ChangePageButton';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

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
  const [loading, setLoading] = useState(true);
  const [pagesAvailable, setPagesAvailable] = useState(0);
  const [queryPage, setQueryPage] = useQueryParam('page', NumberParam);
  const [queryName, setQueryName] = useQueryParam('name', StringParam);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSearchSubmit = useCallback(
    ({ name }: SearchFormData) => {
      setQueryPage(1);
      setQueryName(name || undefined);
    },
    [setQueryName, setQueryPage],
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
          <Header
            initialName={queryName}
            onSubmit={handleSearchSubmit}
            disabled
            createPage="/clients/register"
            title="Clientes"
            placeholder="Digite o nome do cliente"
          />
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
          <Header
            onSubmit={handleSearchSubmit}
            disabled={!queryName}
            createPage="/clients/register"
            title="Clientes"
            placeholder="Digite o nome do cliente"
          />
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
        <Header
          initialName={queryName}
          onSubmit={handleSearchSubmit}
          createPage="/clients/register"
          title="Clientes"
          placeholder="Digite o nome do cliente"
        />

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
              <S.ClientRow
                onClick={() => history.push(`/clients/edit/${client.id}`)}
                key={client.id}
              >
                <td>{client.name}</td>
                <td>{client.cpf}</td>
                <td>{client.phone_number}</td>
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

export default ListClients;
