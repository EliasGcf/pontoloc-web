import React, { useEffect, useState } from 'react';
import { Ring } from 'react-awesome-spinners';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';

import api from '../../../services/api';

import { BackButton } from '../../../components/Form';
import { formatPrice } from '../../../utils/format';

import {
  Container,
  Content,
  MessageContainer,
  Client,
  Line,
  Contract,
} from './styles';

interface ContractData {
  id: string;
  number: number;
  collect_price: number | null;

  delivery_price: number;
  delivery_price_formatted: string;

  daily_total_price: number;
  final_price: number;
  collect_at: Date | null;

  created_at: Date;
  created_at_formatted: string;

  client: {
    id: string;
    name: string;
    cpf: string;
    address: string;
    phone_number: string;
  };
}

const DetailsContract: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contract, setContract] = useState<ContractData>({} as ContractData);

  const theme = useTheme();
  const { id } = useParams();

  useEffect(() => {
    async function loadContract(): Promise<void> {
      const response = await api.get<ContractData>(`/contracts/${id}`);
      const { data } = response;

      const createdAtDate = new Date(data.created_at);
      const dateFormated = createdAtDate.toLocaleDateString('pt-BR');
      const timeFormated = createdAtDate.toLocaleTimeString('pt-BR');
      const created_at_formatted = `${dateFormated} às ${timeFormated}`;

      // console.log(data);
      setContract({
        ...data,
        delivery_price_formatted: formatPrice(data.delivery_price),
        created_at_formatted,
      });
      setIsLoading(false);
    }

    loadContract();
  }, [id]);

  if (isLoading) {
    return (
      <Container>
        <Content>
          <header>
            <h1>DETALHES DO CONTRATO</h1>

            <section>
              <BackButton />
            </section>
          </header>
        </Content>
        <MessageContainer>
          <Ring size={100} color={theme.colors.yellow} />
        </MessageContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <header>
          <h1>{`DETALHES DO CONTRATO #${contract.number}`}</h1>

          <section>
            <BackButton />
          </section>
        </header>

        <Client>
          <h1>CLIENTE</h1>
          <section>
            <h2>{contract.client.name}</h2>
            <Line />
            <h2>{contract.client.cpf}</h2>
          </section>
          <section>
            <h2>{contract.client.address}</h2>
            <Line />
            <h2>{contract.client.phone_number}</h2>
          </section>
        </Client>

        <Contract>
          <h1>ITENS DO CONTRATO</h1>
          <section>
            <h2>Valor de entrega</h2>
            <Line />
            <h2>{contract.delivery_price_formatted}</h2>
          </section>
          <section>
            <h2>Data de retirada</h2>
            <Line />
            <h2>{contract.created_at_formatted}</h2>
          </section>
        </Contract>
      </Content>
    </Container>
  );
};

export default DetailsContract;
