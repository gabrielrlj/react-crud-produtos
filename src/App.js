import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ProdutoService } from './service/ProdutoService';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

export default class App extends Component{
  constructor(){
    super();
    this.state = {};
    this.produtoService = new ProdutoService();
  }

  componentDidMount(){
    this.produtoService.getAll().then(data => this.setState({produtos: data}))
  }

  render(){
    return(
      <DataTable value={this.state.produtos}>
        <Column field="id" header="ID"></Column>
        <Column field="nome" header="NOME"></Column>  
        <Column field="quantidade" header="QUANTIDADE"></Column>
        <Column field="valor" header="VALOR"></Column> 
      </DataTable>
    );
  }

}
