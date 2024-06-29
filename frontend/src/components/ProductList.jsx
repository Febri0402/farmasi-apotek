import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);


    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async () =>{
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
  
    };

    const deleteProduct = async (productId) =>{
        await axios.delete(`http://localhost:5000/products/${productId}`);
        getProducts();
    };

  return (
    <div>
       <h1 className="title">Produk</h1>
        <h2 className="subtitle">Daftar Produk</h2>
        <Link to="/products/add" className="button is-primary mb-2">
            Tambah
        </Link>
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Kode barang</th>
                    <th>Nama barang</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Tanggal kadaluarsa</th>
                    <th>Dibuat Oleh</th>
                    <th>Tindakan</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index)=>(
                    <tr key={product.uuid}>
                    <td>{index + 1}</td>
                    <td>{product.kode_barang}</td>
                    <td>{product.nama_barang}</td>
                    <td>{product.harga}</td>
                    <td>{product.jumlah}</td>
                    <td>{product.tanggal_kadaluarsa}</td>
                    <td>{product.user.name}</td>
                    <td>
                        <Link 
                        to={`/products/edit/${product.uuid}`} 
                        className="button is-small is-info"
                        >
                        Edit
                        </Link>
                        <button 
                        onClick={()=> deleteProduct(product.uuid)} 
                        className="button is-small is-danger"
                        >
                        Hapus
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ProductList;