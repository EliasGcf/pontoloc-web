import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Ring } from 'react-awesome-spinners';
import { useParams, useHistory } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import { BackButton, InputCurrency } from '../../../components/Form';
import { formatPrice } from '../../../utils/format';
import FinishContractButton from '../../../components/FinishContractButton';
import contractFinalPrice from '../../../utils/contractFinalPrice';
import { useToast } from '../../../hooks/toast';

import {
  Container,
  Content,
  MessageContainer,
  Client,
  Line,
  Contract,
  MaterialTable,
  MaterialRow,
  FinalInformations,
  Form,
  FinishButton,
} from './styles';

interface ContractData {
  id: string;
  number: number;
  collect_price: number | null;

  delivery_price: number;
  delivery_price_formatted: string;

  daily_total_price: number;
  daily_total_price_formatted: string;

  final_price: number;
  collect_at: Date | null;

  created_at: string;
  created_at_formatted: string;

  client: {
    id: string;
    name: string;
    cpf: string;
    address: string;
    phone_number: string;
  };

  contract_items: Array<{
    id: string;

    price_quantity_daily: number;
    price_quantity_daily_formatted: string;

    quantity: number;
    material: {
      id: string;
      daily_price: number;
      daily_price_formatted: string;
      name: string;
    };
  }>;
}

interface FormData {
  collect_price: number;
}

const DetailsContract: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [contract, setContract] = useState<ContractData | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { addToast } = useToast();
  const history = useHistory();

  const handleCollectPriceChange = useCallback(() => {
    const finalPrice = contractFinalPrice({
      collect_price: formRef.current?.getFieldValue('collect_price'),
      created_at: contract?.created_at || '',
      daily_total_price: contract?.daily_total_price || 0,
      delivery_price: contract?.delivery_price || 0,
    });

    formRef.current?.setFieldValue('final_price', finalPrice);
  }, [contract]);

  const theme = useTheme();
  const { id } = useParams();

  const toggleShowForm = useCallback(() => {
    setShowForm(state => !state);
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setIsLoading(true);
        await api.put(`/contracts/${id}/finish`, {
          collect_price: Number(data.collect_price),
        });
        setIsLoading(false);

        addToast({
          type: 'success',
          title: 'Contrato finalizado com sucesso!',
        });
        history.goBack();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error ao finalizar contrato',
        });
      }
    },
    [id, addToast, history],
  );

  useEffect(() => {
    async function loadContract(): Promise<void> {
      try {
        const response = await api.get<ContractData>(`/contracts/${id}`);
        const { data } = response;

        const createdAtDate = new Date(data.created_at);
        const dateFormated = createdAtDate.toLocaleDateString('pt-BR');
        const timeFormated = createdAtDate.toLocaleTimeString('pt-BR');
        const created_at_formatted = `${dateFormated} às ${timeFormated}`;

        const contract_items = data.contract_items.map(item => ({
          ...item,
          price_quantity_daily_formatted: formatPrice(
            item.price_quantity_daily,
          ),
          material: {
            ...item.material,
            daily_price_formatted: formatPrice(item.material.daily_price),
          },
        }));

        setContract({
          ...data,
          delivery_price_formatted: formatPrice(data.delivery_price),
          daily_total_price_formatted: formatPrice(data.daily_total_price),
          created_at_formatted,
          contract_items,
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error ao carregar detalhes do contrato',
          description:
            'Houve um error ao carregar os detalhes do contrato, tente novamente mais tarde!',
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadContract();
  }, [id, addToast]);

  if (isLoading) {
    return (
      <Container>
        <Content>
          <header>
            <h1>DETALHES DO CONTRATO</h1>

            <section>
              <BackButton />

              <FinishContractButton isLoading={isLoading} />
            </section>
          </header>
        </Content>
        <MessageContainer>
          <Ring size={100} color={theme.colors.yellow} />
        </MessageContainer>
      </Container>
    );
  }

  if (!contract) {
    return (
      <Container>
        <Content>
          <header>
            <h1>DETALHES DO CONTRATO</h1>

            <section>
              <BackButton />

              <FinishContractButton
                disabled={!contract}
                isLoading={isLoading}
              />
            </section>
          </header>
        </Content>
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
            <FinishContractButton
              onClick={toggleShowForm}
              isLoading={isLoading}
              showForm={showForm}
            />
          </section>
        </header>

        {showForm && (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputCurrency disabled name="final_price" label="VALOR FINAL" />
            <InputCurrency
              name="collect_price"
              label="VALOR DE COLETA"
              placeholder="R$ 0,00"
              onKeyUp={handleCollectPriceChange}
              onFocus={handleCollectPriceChange}
              autoFocus
            />

            <FinishButton>CONFIRMAR</FinishButton>
          </Form>
        )}

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

        <MaterialTable>
          <thead>
            <tr>
              <th>MATERIAL</th>
              <th>DIÁRIA</th>
              <th>QUANTIDADE</th>
              <th>DIÁRIA TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {contract.contract_items.map(item => (
              <MaterialRow key={item.id}>
                <td>{item.material.name}</td>
                <td>{item.material.daily_price_formatted}</td>
                <td>{item.quantity}</td>
                <td>{item.price_quantity_daily_formatted}</td>
              </MaterialRow>
            ))}
          </tbody>
        </MaterialTable>

        <FinalInformations>
          <span>{`TOTAL: ${contract.daily_total_price_formatted}`}</span>
        </FinalInformations>
      </Content>
    </Container>
  );
};

export default DetailsContract;
