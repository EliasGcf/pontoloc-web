import React, { useState, useCallback, useEffect } from 'react';
import { Ring } from 'react-awesome-spinners';
import { useLocation } from 'react-router-dom';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Header from './components/Header';

import * as S from './styles';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';

interface IMaterial {
  id: string;
  name: string;
  daily_price: number;
  formatted_price: string;
}

interface ISearchFormData {
  name: string;
}

const ListMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<IMaterial[]>([]);
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
    async function loadMaterials(): Promise<void> {
      try {
        setLoading(true);
        const response = await api.get<IMaterial[]>('/materials', {
          params: { page, name: searchName || undefined },
        });

        const totalCount = response.headers['x-total-count'];

        const data = response.data.map(material => ({
          ...material,
          formatted_price: formatPrice(material.daily_price),
        }));

        setPagesAvailable(Math.ceil(totalCount / 7));
        setMaterials(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadMaterials();
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
          materials.length !== 0 && (
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

export default ListMaterials;
