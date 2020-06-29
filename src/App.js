import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ProdutoService } from './service/ProdutoService';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import {Menubar} from 'primereact/menubar';
import {Panel} from 'primereact/panel';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Growl} from 'primereact/growl';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible: false,
      produto: {
        id: null,
        nome: null,
        quantidade: null,
        valor: null
      },
      selectedProduto : {

      }
    };
    this.items = [
      {
        label: 'Novo',
        icon: 'pi pi-fw pi-file',
        command : () => {this.showSaveDialog()}
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label: 'Deletar',
        icon: 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      },
    ];
    this.produtoService = new ProdutoService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Salvar" icon="pi pi-check" onClick={this.save} />
      </div>
    );

  }

  componentDidMount(){
    this.produtoService.getAll().then(data => this.setState({produtos: data}))
  }

  save(){
    this.produtoService.save(this.state.produto).then(data => {
      this.setState({
        visible: false,
        produto: {
          id: null,
          nome: null,
          quantidade: null,
          valor: null
        }
      });
      this.growl.show({severity: 'success', summary: 'Atenção!', detail: 'Produto salvo.'}); 
      this.produtoService.getAll().then(data => this.setState({produtos: data}))
    })
  }

  delete(){
    if(window.confirm("Realmente deseja apagar o registro?")){
      this.produtoService.delete(this.state.selectedProduto.id).then(data => {
          this.growl.show({severity: 'success', summary: 'Atenção!', detail: 'Produto removido.'}); 
          this.produtoService.getAll().then(data => this.setState({produtos: data}))
      });
    }
  }

  render(){
    return(
      <div style={{width:'80%',margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br>
        </br>
        <Panel header="React CRUD App">
          <DataTable value={this.state.produtos} selectionMode="single" selection={this.state.selectedProduto} onSelectionChange={e => this.setState({selectedProduto: e.value})}>
            <Column field="id" header="ID"></Column>
            <Column field="nome" header="NOME"></Column>  
            <Column field="quantidade" header="QUANTIDADE"></Column>
            <Column field="valor" header="VALOR"></Column> 
          </DataTable>
        </Panel>
        <Dialog header="Salvar produto" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
          <form id="produto-form">
              <span className="p-float-label">
                <InputText value={this.state.produto.nome} style={{width : '100%'}} id="nome" onChange={(e) =>{
                    let val = e.target.value;

                    this.setState(prevState => {
                      let produto = Object.assign({}, prevState.produto);
                      produto.nome = val;

                      return {produto};
                    })} 
                }/>
                <label htmlFor="nome">Nome</label>
              </span>
              <br>
              </br>
              <span className="p-float-label">
                <InputText value={this.state.produto.quantidade} style={{width : '100%'}} id="quantidade"onChange={(e) =>{
                    let val = e.target.value;

                    this.setState(prevState => {
                      let produto = Object.assign({}, prevState.produto);
                      produto.quantidade = val;

                      return {produto};
                    })} 
                }/>
                <label htmlFor="quantidade">Quantidade</label>
              </span>
              <br>
              </br>
              <span className="p-float-label">
                <InputText value={this.state.produto.valor} style={{width : '100%'}} id="valor" onChange={(e) =>{
                    let val = e.target.value;

                    this.setState(prevState => {
                      let produto = Object.assign({}, prevState.produto);
                      produto.valor = val;

                      return {produto};
                    })} 
                }/>
                <label htmlFor="valor">Valor</label>
              </span>
          </form>
        </Dialog>
        <Growl ref={(el) => this.growl = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible: true,
      produto: {
        id: null,
        nome: null,
        quantidade: null,
        valor: null
      } 
    });
    document.getElementById('produto-form').reset();
  }

showEditDialog(){
  this.setState({
    visible : true,
    produto: {
      id: this.state.selectedProduto.id,
      nome: this.state.selectedProduto.nome,
      quantidade: this.state.selectedProduto.quantidade,
      valor: this.state.selectedProduto.valor 
    } 
  })
}

}
