import axios from 'axios';

export class ProdutoService{
    
    baseUrl = "https://jardim-api-rest-produtos.herokuapp.com/api/";

    getAll(){
        return axios.get(this.baseUrl + "produtos").then(res => res.data);
    }

    save(produto){
        return axios.post(this.baseUrl + "produto", produto).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl + "deletarProduto/"+id).then(res => res.data);
    }
}