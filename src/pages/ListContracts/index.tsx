import React, { useEffect, useState } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';

import { UInput } from '../../components/Form';
import api from '../../services/api';

import * as S from './styles';

interface IContracts {
  id: string;
  client: {
    name: string;
  };
  daily_total_price: number;
  created_at: Date;
}

const ListContracts: React.FC = () => {
  const [contracts, setContracts] = useState<IContracts[]>([]);

  useEffect(() => {
    async function loadContracts(): Promise<void> {
      const response = await api.get('/contracts');

      console.log(response.data);
      setContracts(response.data);
    }

    loadContracts();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Form onSubmit={data => console.log(data)}>
          <UInput placeholder="Buscar" icon={FiSearch} name="search" />
          <S.SearchButton type="submit">
            <FiSearch size={24} />
          </S.SearchButton>
          <S.AddButton type="submit">
            <FiPlus size={24} />
            CADASTRAR
          </S.AddButton>
        </S.Form>

        <h1>Aluguéis</h1>
      </S.Header>

      <S.TableHeader>
        <strong>NOME</strong>
        <strong>DATA DE RETIRADA</strong>
        <strong>DIÁRIA</strong>
      </S.TableHeader>

      <S.Table>
        <tbody>
          {contracts.map(contract => (
            <S.ClientRow key={contract.id}>
              <td>{contract.client.name}</td>
              <td>{contract.created_at}</td>
              <td>{`R$ ${contract.daily_total_price}`}</td>
            </S.ClientRow>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default ListContracts;
