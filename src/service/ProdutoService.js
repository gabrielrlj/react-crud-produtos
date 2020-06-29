import axios from 'axios';

export class ProdutoService{
    
    baseUrl = "http://localhost:8080/api/";

    getAll(){
        return axios.get(this.baseUrl + "produtos").then(res => res.data);
    }
}