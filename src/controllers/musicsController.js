const musics = require("../models/musicsBD.js") //arquivo de ligação
const fs = require("fs")

const createMusic = (req, res) => { //CRIADO
    let { id, title, duration, launchYear, favorited, artists } = req.body



//CRIANDO O METODO NO MONGOSE    

//CREATE    
    let createSong = {"id": Math.random().toString(32).substr(2),
        title,
        duration,
        launchYear,
        favorited,
        artists}

    let newMusic = new musics(createSong) 
    newMusic.save(          //guarda que vamos criar
     function(err){
         if(err){
             res.status(500).send({"message:": err})
         }
         else{
            musics.updateOne({$set:{createSong}}) // up.. atualiza que fizer
            res.status(200).send({"message": "Musica, criada com sucesso"})
            }
     }
    )               


}

//DELETE
const deleteMusic = (req, res) => {
    
    const musicId = req.params.id

    musics.findOne({id:musicId}, function (err, music)
    {
        if(err) {
            res.status(500).send({"message": err.message})
         } else {
            if(music) {
                musics.deleteOne({id: musicId}, function (err){
                    if (err) {
                        res.status(500).send({"message": err.message, status: "FAIL"})
                    } else{
                        res.status(200).send({"message": "Música deletada com sucesso!", status: "SUCESS"})
                    }
                } )
            } else {
                res.status(400).send({"message": "Não há música com esse ID"})
            }

        } 
        

    })

}

//PUT
const updateMusic = (req, res) => {

    const musicId = req.params.id
    musics.findOne({id: musicId}, function (err, musicFound){
        if(err) {
            res.status(500).send({"message": err.message}) 

        } else {
            if(musicFound) {
                musics.updateOne({id: musicId}, {$set: req.body}, function (err){
                    if(err){
                        res.status(500).send({"message": err.message})
                    } else {
                        res.status(200).send({"message": "Música atualizada com sucesso!"})
                    }
                })
            } else {
                res.status(404).send({"message": "Música não encontrada"})
            }
        }

    })
 }

//PATH 
const updateFavorited = (req, res) => {
     
    const musicId = req.params.id
    let favorited = req.body.favorited
    musics.findOne({id: musicId}, function (err,favoriteMusic){
        if(err) {
            res.status(500).send({"message": err.message})
        } else {
            if(favoriteMusic) {
                musics.updateOne({id: musicId}, {$set: {favorited: newFavorited}}, function (err){
                    if(err) {
                        res.status(500).send({"message": err.message})
                    } else {
                        res.status(200).send({"message": "Favorito alterado com sucesso!"})
                    }
                })
            } else {
                res.status(404).send({"message": "Favorito não encontrado"})
            }
        }
    })
    
}



const getAllMusics = (req, res) => {

    musics.find((err,musicFound) => {
        if(err) {
            res.status(500).send({"message": err.message})
        } else {
            if(musicFound && musicFound.length > 0 ) {
                res.status(200).send(musicsFound)
            } else {
                res.status(204).send({"message": "Nenhuma música encontrada"})
            }
        } 
    })
  
}

const getMusic = (req, res) => {
    const musicId = req.params.id
    const musicFound = musics.find(music => music.id == musicId)
    if (musicFound) {
        res.status(200).send(musicFound)
    } else {
        res.status(404).send({ message: "Música não encontrada" })
    }
}

module.exports = {
    createMusic,
    deleteMusic,
    updateFavorited,
    updateMusic,
    getAllMusics,
    getMusic,
}