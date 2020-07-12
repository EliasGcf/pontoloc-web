import React, { useState, useEffect, useCallback } from 'react';
import { FormHandles } from '@unform/core';

import { InputAsyncSelect } from '../../../../../components/Form';
import api from '../../../../../services/api';

import { Form, DeliveryPriceInput } from './styles';

interface Client {
  id: string;
  name: string;
}

interface Option {
  value: string;
  label: string;
}

interface ContractFormData {
  client_id: string;
  delivery_price?: string;
}

interface ContractFormProps {
  onSubmit(data: ContractFormData): void;
  formRef: React.RefObject<FormHandles>;
}

const ContractForm: React.FC<ContractFormProps> = ({ onSubmit, formRef }) => {
  const [clientOptions, setClientOptions] = useState<Option[]>([]);
  const [optionsIsLoading, setOptionsIsLoading] = useState(true);
  const [clientsPage, setClientsPage] = useState(1);
  const [clientsPagesAvailable, setClientsPagesAvailable] = useState(0);

  useEffect(() => {
    async function loadClientOptions(): Promise<void> {
      const response = await api.get<Client[]>('/clients');

      const clientsTotalCount = response.headers['x-total-count'];

      setClientsPagesAvailable(Math.ceil(clientsTotalCount / 7));
      setClientOptions(
        response.data.map(client => ({
          label: client.name,
          value: client.id,
        })),
      );
      setOptionsIsLoading(false);
    }

    loadClientOptions();
  }, []);

  const handleClientsMenuScrollToBottom = useCallback(async () => {
    if (clientsPage === clientsPagesAvailable) return;

    setOptionsIsLoading(true);
    const response = await api.get<Client[]>('/clients', {
      params: {
        page: clientsPage + 1,
      },
    });

    setClientOptions(state => [
      ...state,
      ...response.data.map(client => ({
        label: client.name,
        value: client.id,
      })),
    ]);
    setClientsPage(clientsPage + 1);
    setOptionsIsLoading(false);
  }, [clientsPage, clientsPagesAvailable]);

  const handleLoadClientOptions = useCallback(
    async (inputValue: string, callback) => {
      const data = clientOptions.filter(client =>
        client.label.includes(inputValue),
      );

      if (data.length === 0) {
        // fazer debaunce
        setOptionsIsLoading(true);
        const response = await api.get<Client[]>('/clients', {
          params: {
            name: inputValue,
          },
        });

        setOptionsIsLoading(false);

        callback(
          response.data.map(client => ({
            label: client.name,
            value: client.id,
          })),
        );
        return;
      }

      callback(data);
    },
    [clientOptions],
  );

  return (
    <Form ref={formRef} onSubmit={onSubmit}>
      <InputAsyncSelect
        placeholder="Escolha o locatário"
        label="LOCATÁRIO"
        name="client_id"
        defaultOptions={clientOptions}
        loadOptions={handleLoadClientOptions}
        onMenuScrollToBottom={handleClientsMenuScrollToBottom}
        noOptionsMessage={() => 'Nenhum cliente encontrado'}
        isLoading={optionsIsLoading}
      />
      <DeliveryPriceInput name="delivery_price" label="PREÇO DE ENTREGA" />
    </Form>
  );
};

export default ContractForm;
