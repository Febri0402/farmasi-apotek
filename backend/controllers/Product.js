import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
   
   
export const getProducts = async(req, res) =>{
    try{
        let response;
        if(req. role === "admin"){
            response = await Product.findAll({
                attributes:['uuid','nama_barang','harga','kode_barang','jumlah','tanggal_kadaluarsa'],
                include:[{
                    model: User,
                    attributes:['name','email'],
                }]
            });
        }else{
            response = await Product.findAll({
                attributes:['uuid','nama_barang','harga','kode_barang','jumlah','tanggal_kadaluarsa'],
                where:{
                   userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email'],
                }]
            });
        }
        res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

export const getProductById = async(req, res) =>{
    try{
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Product.findOne({
                attributes:['uuid','nama_barang','harga','kode_barang','jumlah','tanggal_kadaluarsa'],
                where:{
                    id: product.id
                },
                include:[{
                    model: User,
                    attributes:['name','email'],
                }]
            });
        }else{
            response = await Product.findOne({
                attributes:['uuid','nama_barang','harga','kode_barang','jumlah','tanggal_kadaluarsa'],
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email'],
                }]
            });
        }
        res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

export const createProduct = async(req, res) =>{
    const {nama_barang, harga, kode_barang, jumlah, tanggal_kadaluarsa} = req.body;
    try {
        await Product.create({
            nama_barang: nama_barang,
            harga: harga,
            kode_barang: kode_barang,
            jumlah: jumlah,
            tanggal_kadaluarsa: tanggal_kadaluarsa,
            userId: req.userId

        });
        res.status(201).json({msg: "Product Created Successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateProduct = async(req, res) =>{
    try{
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {nama_barang, harga, kode_barang, jumlah, tanggal_kadaluarsa} = req.body;
        if(req.role === "admin"){
            await Product.update({nama_barang, harga, kode_barang, jumlah, tanggal_kadaluarsa},{
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Product.update({nama_barang, harga, kode_barang, jumlah, tanggal_kadaluarsa},{
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product updated successfully"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

export const deleteProduct = async(req, res) => {
    try{
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {nama_barang, harga, kode_barang, jumlah, tanggal_kadaluarsa} = req.body;
        if(req.role === "admin"){
            await Product.destroy({
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Product.destroy({
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product deleted successfully"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}