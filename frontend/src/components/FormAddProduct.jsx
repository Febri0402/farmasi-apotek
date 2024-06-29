import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
    const [kode_barang, setKode_barang] = useState("");
    const [nama_barang, setNama_barang] = useState("");
    const [harga, setHarga] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [tanggal_kadaluarsa, setTanggal_kadaluarsa] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/products", {
                kode_barang: kode_barang,
                nama_barang: nama_barang,
                harga: harga,
                jumlah: jumlah,
                tanggal_kadaluarsa: tanggal_kadaluarsa

            });
            navigate("/products");
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };
  return (
    <div>
        <h1 className="title">Produk</h1>
        <h2 className="subtitle">Tambah Produk Baru</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveProduct}>
                    <p className="has-text-centered">{msg}</p>
                    <div className="field">
                        <label className="label">kode_barang</label>
                        <div className="control">
                            <input type="text" 
                            className="input" 
                            value={kode_barang}
                            onChange={(e) =>setKode_barang(e.target.value)}
                            placeholder="Kode barang"/>
                        </div>
                    </div>
                <div className="field">
                        <label className="label">nama_barang</label>
                        <div className="control">
                            <input type="text" 
                            className="input" 
                            value={nama_barang}
                            onChange={(e) =>setNama_barang(e.target.value)}
                            placeholder="nama barang"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">harga</label>
                        <div className="control">
                            <input type="text" 
                            className="input" 
                            value={harga}
                            onChange={(e) =>setHarga(e.target.value)}
                            placeholder="harga"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">jumlah</label>
                        <div className="control">
                            <input type="text" 
                            className="input" 
                            value={jumlah}
                            onChange={(e) =>setJumlah(e.target.value)}
                            placeholder="jumlah"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">tanggal_kadaluarsa</label>
                        <div className="control">
                            <input type="text" 
                            className="input" 
                            value={tanggal_kadaluarsa}
                            onChange={(e) =>setTanggal_kadaluarsa(e.target.value)}
                            placeholder="tanggal kadaluarsa"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <button type="submit" className="button is-success">Simpan</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddProduct;