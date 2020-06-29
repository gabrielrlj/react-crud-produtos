import axios from 'axios';

export class ProdutoService{
    
    baseUrl = "http://localhost:8080/api/";

    getAll(){
        return axios.get(this.baseUrl + "produtos").then(res => res.data);
    }

    save(produto){
        return axios.post(this.baseUrl + "produto", produto).then(res => res.data);
    }
}