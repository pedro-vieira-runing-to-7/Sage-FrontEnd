import React, { Component } from 'react';
import FormDadosPessoa from './FormDadosPessoa';
import FormDadosEndereco from './FormDadosEndereco';
import Confirmar from './FormConfirmar';
import FormSart from './FormStart';
import Successo from './Sucesso';
import ApiService from "../../service/ApiService";

export class StepsCadastro extends Component {

  state = {
            step: 1,           
            data:{
            Id: '',
            IdStatus: 0,
            IdTipoPessoa: 0,
            Nome: '',
            NomeSocial: '',
            CpfCnpj: '',
            RgIe: '',
            DataNascimentoAbertura: "2020-03-02",
            Sexo: '',
            Email: '',
            NumeroTelefoneFixo: '',
            NumeroCelular: '',
            EnderecoId: '',
            EnderecoIdStatus: 0,
            EnderecoIdTipoEndereco: 0,
            EnderecoLogradouro: '',
            EnderecoNumero: '',
            EnderecoBairro: '',
            EnderecoCidade: '',
            EnderecoCep: '',
            EnderecoIdEstado: '',
            EnderecoNomeEstado: ''
         }
       
        }
      
    componentWillMount() {
       this.loadPessoa();
       this.loadPessoa = this.loadPessoa.bind(this);      
    }
  

  loadPessoa() {
      
    const acaoForm = window.localStorage.getItem("acaoForm");
    const pessoaId = window.localStorage.getItem("pessoaId");

    // se for ação de alteração 
    if (pessoaId !== '' && acaoForm === '1')
    {
    ApiService.fetchPessoaById(pessoaId)
        .then((res) => {
            let pessoa = res.data;
            this.setState({
               data:{
                Id: pessoa.id,
                IdStatus:  pessoa.idStatus,
                IdTipoPessoa: pessoa.idTipoPessoa,
                Nome: pessoa.nome,
                NomeSocial: pessoa.nomeSocial,
                CpfCnpj: pessoa.cpfCnpj,
                RgIe: pessoa.rgIe,
                DataNascimentoAbertura: pessoa.dataNascimentoAbertura,
                Sexo: pessoa.sexo,
                Email: pessoa.email,
                NumeroTelefoneFixo: pessoa.numeroTelefoneFixo,
                NumeroCelular: pessoa.numeroCelular,
                EnderecoId: pessoa.endereco[0].id,
                EnderecoIdPessoa: pessoa.endereco[0].idPessoa,
                EnderecoIdStatus: pessoa.endereco[0].idStatus,
                EnderecoIdTipoEndereco: pessoa.endereco[0].idTipoEndereco,
                EnderecoLogradouro: pessoa.endereco[0].logradouro,
                EnderecoNumero: pessoa.endereco[0].numero,
                EnderecoBairro: pessoa.endereco[0].bairro,
                EnderecoCidade: pessoa.endereco[0].cidade,
                EnderecoCep: pessoa.endereco[0].cep,
                EnderecoIdEstado: pessoa.endereco[0].idEstado,      
                EnderecoNomeEstado: ''
            }
          })
        });
      }
}


/////////////////////////////////////////////////////////////////////////////////
  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    const { data } = this.state;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };

  render() {
    const { step, data } = this.state;
    
   /* const { Id,
            IdStatus,
            IdTipoPessoa,
            Nome,
            NomeSocial,
            CpfCnpj,
            RgIe,
            DataNascimentoAbertura,
            Sexo,
            Email,
            NumeroTelefoneFixo,
            NumeroCelular,
            EnderecoId,
            EnderecoIdStatus,
            EnderecoIdTipoEndereco,
            EnderecoLogradouro,
            EnderecoNumero,
            EnderecoBairro,
            EnderecoCidade,
            EnderecoCep,
            EnderecoIdEstado,
            EnderecoNomeEstado } = this.state;
    const values = { 
                      Id,
                      IdStatus,
                      IdTipoPessoa,
                      Nome,
                      NomeSocial,
                      CpfCnpj,
                      RgIe,
                      DataNascimentoAbertura,
                      Sexo,
                      Email,
                      NumeroTelefoneFixo,
                      NumeroCelular,
                      EnderecoId,
                      EnderecoIdStatus,
                      EnderecoIdTipoEndereco,
                      EnderecoLogradouro,
                      EnderecoNumero,
                      EnderecoBairro,
                      EnderecoCidade,
                      EnderecoCep,
                      EnderecoIdEstado,
                      EnderecoNomeEstado 
                 }; */

    switch (step) {
      case 1:
        return (
          <FormSart
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            data={data}
          />
        );
        case 2:
          return (
            <FormDadosPessoa
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              data={data}
            />
          );
      case 3:
        return (
          <FormDadosEndereco
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            data={data}
          />
        );
      case 4:
        return (
          <Confirmar
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            data={data}
          />
        );
      case 5:
        return <Successo />;
    }
  }
}

export default StepsCadastro;
