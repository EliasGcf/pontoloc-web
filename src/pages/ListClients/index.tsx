import React, { useState, useCallback, useEffect } from 'react';
import { Ring } from 'react-awesome-spinners';
import { useLocation } from 'react-router-dom';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Header from './components/Header';

import * as S from './styles';
import api from '../../services/api';

interface IClient {
  id: string;
  name: string;
  cpf: string;
  phone_number: string;
}

interface ISearchFormData {
  name: string;
}

const ListClients: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagesAvailable, setPagesAvailable] = useState(0);
  const { search } = useLocation();
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(
    () => Number(new URLSearchParams(search).get('page')) || 1,
  );

  const handleSearchSubmit = useCallback(({ name }: ISearchFormData) => {
    setSearchName(name);
  }, []);

  const incrementPage = useCallback(() => {
    setPage(state => state + 1);
  }, []);

  const decrementPage = useCallback(() => {
    setPage(state => state - 1);
  }, []);

  useEffect(() => {
    async function loadClients(): Promise<void> {
      try {
        setLoading(true);
        const response = await api.get<IClient[]>('/clients', {
          params: { page, name: searchName || undefined },
        });

        const totalCount = response.headers['x-total-count'];

        setPagesAvailable(Math.ceil(totalCount / 7));
        setClients(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, [page, searchName]);

  return (
    <S.Container>
      <S.Content>
        <Header onSubmit={handleSearchSubmit} />

        {loading ? (
          <S.LoadingSpinnerContainer>
            <Ring size={100} color="#FBC131" />
          </S.LoadingSpinnerContainer>
        ) : (
          clients.length !== 0 && (
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

export default ListClients;
