import React, { useState, useCallback, useEffect } from 'react';
import { Ring } from 'react-awesome-spinners';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';

import api from '../../../services/api';
import { formatPrice } from '../../../utils/format';
import { useToast } from '../../../hooks/toast';
import ChangePageButton from '../../../components/ChangePageButton';

import Header from './components/Header';

import * as S from './styles';

interface Material {
  id: string;
  name: string;
  daily_price: number;
  formatted_price: string;
}

interface SearchFormData {
  name: string;
}

const ListMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
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
    async function loadMaterials(): Promise<void> {
      try {
        const response = await api.get<Material[]>('/materials', {
          params: {
            page: queryPage || 1,
            name: queryName || undefined,
          },
        });

        const totalCount = response.headers['x-total-count'];

        const data = response.data.map(material => ({
          ...material,
          formatted_price: formatPrice(material.daily_price),
        }));

        setPagesAvailable(Math.ceil(totalCount / 7));
        setMaterials(data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca',
        });
      } finally {
        setLoading(false);
      }
    }

    loadMaterials();
  }, [addToast, queryPage, queryName]);

  if (loading) {
    return (
      <S.Container>
        <S.Content>
          <Header onSubmit={handleSearchSubmit} />
          <S.MessageContainer>
            <Ring size={100} color="#FBC131" />
          </S.MessageContainer>
        </S.Content>
      </S.Container>
    );
  }

  if (materials.length === 0) {
    return (
      <S.Container>
        <S.Content>
          <Header onSubmit={handleSearchSubmit} disabled />
          <S.MessageContainer>
            <span>Nenhum material foi encontrado.</span>
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
              <th>DIÁRIA</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(material => (
              <S.MaterialRow key={material.id}>
                <td>{material.name}</td>
                <td>{material.formatted_price}</td>
              </S.MaterialRow>
            ))}
          </tbody>
        </S.Table>

        <S.Pagination>
          {!(queryPage === 1 || !queryPage) && (
            <ChangePageButton
              changePageTo="decrement"
              disabled={queryPage === 1 || !queryPage}
              onClick={decrementPage}
            />
          )}
          {!(pagesAvailable <= 1 || queryPage === pagesAvailable) && (
            <ChangePageButton
              changePageTo="increment"
              disabled={pagesAvailable <= 1 || queryPage === pagesAvailable}
              onClick={incrementPage}
              style={{ marginLeft: 'auto' }}
            />
          )}
        </S.Pagination>
      </S.Content>
    </S.Container>
  );
};

export default ListMaterials;
