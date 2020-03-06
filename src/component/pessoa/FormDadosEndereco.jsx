import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ApiService from "../../service/ApiService";

class EnderecoComponent extends Component{   
  
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

    constructor(props){
        super(props);
        this.state ={
            status: '',
            estados: '',
            tipoEndereco: '',
            lstEstados: [],
            lstStatus: [],
            lstTipoEndereco: [],
        }
    }

    componentDidMount() {

      this.loadEndereco();

      const estados = ApiService.getEstados();
      const status = ApiService.getStatus();
      const tipoEndereco = ApiService.getTipoEndereco();   

      this.setState({ estados, status, tipoEndereco  })
  
        let estadosAPI = estados.map(estado => {
          return { value: estado.id, display: estado.nome };
        });
       
        let statusAPI = status.map(st => {
          return { value: st.id, display: st.nome };
        });

        let tipoEnderecoAPI = tipoEndereco.map(tipo => {
          return { value: tipo.id, display: tipo.nome };
        });

        this.setState({
          lstEstados: [].concat(estadosAPI), 
          lstStatus: [].concat(statusAPI),
          lstTipoEndereco: [].concat(tipoEnderecoAPI)
        });

        this.loadEndereco = this.loadEndereco.bind(this);
  }

  loadEndereco() {
      
    const acaoForm = window.localStorage.getItem("acaoForm");
    const pessoaId = window.localStorage.getItem("pessoaId");

    // se for ação de alteração 
    if (pessoaId != '' && acaoForm === '1')
    {
    ApiService.fetchPessoaById(pessoaId)
        .then((res) => {
            let pessoa = res.data;
            this.setState({
                EnderecoId: pessoa.endereco[0].id,
                EnderecoIdStatus: pessoa.endereco[0].idStatus,
                EnderecoIdTipoEndereco: pessoa.endereco[0].idTipoEndereco,
                EnderecoLogradouro: pessoa.endereco[0].logradouro,
                EnderecoNumero: pessoa.endereco[0].numero,
                EnderecoBairro: pessoa.endereco[0].bairro,
                EnderecoCidade: pessoa.endereco[0].cidade,
                EnderecoCep: pessoa.endereco[0].cep,
                EnderecoIdEstado: pessoa.endereco[0].idEstado                  
            })
        });
      }
}


    render() {

      const { values, handleChange } = this.props;

        return(
          <React.Fragment>
          <Typography variant="h6" gutterBottom>
           Dados do Endereço
          </Typography>
          <Grid container spacing={50}>
                <form style={formContainer} >
                   
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth margin="normal" 
                        id="EnderecoIdStatus"
                        name="EnderecoIdStatus"
                        select
                        label="Status"
                        value={this.state.EnderecoIdStatus} 
                        onChange={handleChange('EnderecoIdStatus')} defaultValue={values.EnderecoIdStatus}
                        >
                          {this.state.lstStatus.map(dado => (
                                <MenuItem  key={dado.value} value={dado.value}> {dado.display}</MenuItem>
                                ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField fullWidth  margin="normal" 
                        id="EnderecoIdTipoEndereco"
                        name="EnderecoIdTipoEndereco"
                        select
                        label="Tipo Endereço"
                        value={this.state.EnderecoIdTipoEndereco} 
                        onChange={handleChange('EnderecoIdTipoEndereco')} defaultValue={values.EnderecoIdTipoEndereco}
                        >
                          {this.state.lstTipoEndereco.map(dado => (
                                <MenuItem  key={dado.value} value={dado.value}> {dado.display}</MenuItem>
                                ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField type="text" placeholder="Logradouro" fullWidth margin="normal" name="EnderecoLogradouro" value={this.state.EnderecoLogradouro} onChange={handleChange('EnderecoLogradouro')} defaultValue={values.EnderecoLogradouro}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                   <TextField type="text" placeholder="Número" fullWidth margin="normal" name="EnderecoNumero" value={this.state.EnderecoNumero} onChange={handleChange('EnderecoNumero')} defaultValue={values.EnderecoNumero}/>
                   </Grid>
                   <Grid item xs={12} sm={6}>
                    <TextField type="text" placeholder="Bairro" fullWidth margin="normal" name="EnderecoBairro" value={this.state.EnderecoBairro} onChange={handleChange('EnderecoBairro')} defaultValue={values.EnderecoBairro}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField type="text" placeholder="Cidade" fullWidth margin="normal" name="EnderecoCidade" value={this.state.EnderecoCidade} onChange={handleChange('EnderecoCidade')} defaultValue={values.EnderecoCidade}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField type="text" placeholder="CEP" fullWidth margin="normal" name="EnderecoCep" value={this.state.EnderecoCep} onChange={handleChange('EnderecoCep')} defaultValue={values.EnderecoCep}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField fullWidth margin="normal" 
                        id="EnderecoIdEstado"
                        name="EnderecoIdEstado"
                        select
                        label="Estado"
                        value={this.state.EnderecoIdEstado} 
                        onChange={handleChange('EnderecoIdEstado')} defaultValue={values.EnderecoIdEstado}
                        >
                          {this.state.lstEstados.map(dado => (
                                <MenuItem  key={dado.value} value={dado.value}> {dado.display}</MenuItem>
                                ))}
                    </TextField>
                    </Grid>

            </form>

            <br />
        
        <Button
          color="default"
          variant="contained"
          onClick={this.back}
        >Voltar</Button>

&nbsp;&nbsp;&nbsp;
        <Button
          color="primary"
          variant="contained"
          onClick={this.continue}
        >Continuar</Button>

&nbsp;&nbsp;&nbsp;
                    <Button variant="contained" color="default" formNoValidate  onClick={eve => window.location.href='/'}> Cancelar </Button>


            </Grid>
    </React.Fragment>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap',
};


export default EnderecoComponent;