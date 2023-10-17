import sqlite3 from "sqlite3" 
// const db = new sqlite3.Database("./src/models/database.db", sqlite3.OPEN_READWRITE)

export const register = (req, res) => {
    const db = new sqlite3.Database("./src/models/database.db", sqlite3.OPEN_READWRITE, (error) =>{
        if(error){
            console.log(error.message)
            return
        }
        const data =  new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_paulo'})
        const body = req.body
        db.serialize( () =>{
            try {
                db.get("SELECT COUNT(*) AS count_row FROM usuarios WHERE email = ?", [body.email], (error, row) => {
                    if(error){
                        console.log(error.message)
                    }
            
                    if(row.count_row > 0){
                        return res.status(404).json({
                            error: true,
                            code: 404,
                            message: "E-mail ja cadastrado"
                        })
                    }

                    const insert = db.prepare("INSERT INTO usuarios (nome, email, senha, date) VALUES(?,?,?,?)", (error) =>{
                        if(error){
                            res.status(404).json({
                                error: true,
                                code: 404,
                                message: "Erro ao tentar cadastrar"
                            })
                        }
                    })
                    
                    insert.run(body.nome, body.email, body.senha, data)
                    insert.finalize()
                    res.status(200).json({
                        success: true,
                        code: 200,
                        message: "Cadastro realizado com sucesso"
                    })
                })
                
            } catch (error) {
                console.log(error)
            }
        })
        db.close( (error) =>{
            if(error){
                console.log(error.message)
            }
        })
    })
}
export const getUser = (req, res) => {
    const db = new sqlite3.Database("./src/models/database.db", sqlite3.OPEN_READWRITE, (error) =>{
        if(error){
            console.log(error.message)
            return
        }
        const id = req.params.id

        db.serialize( () =>{
            try {
                const query =  "SELECT * FROM usuarios WHERE id = ?"
                db.get(query, [id], (error, row) =>{
                    if(error){
                        console.log(error.message)
                        return res.status(404).json({
                            message: "Erro ao consultar api"
                        })
                    }
                    if(row == undefined){
                        return res.status(404).json({
                            message: "Usúario não encontrado"
                        })
                    }
                    return res.status(200).json({
                        id: row.id,
                        nome: row.nome,
                        email: row.email,
                        data: row.date,
                    })
                })
            } catch (error) {
                console.log(error)
            }
        })
        db.close( (error) =>{
            if(error){
                console.log(error.message)
            }
        })
    })
}
export const deleteUser = (req, res) =>{
    const db = new sqlite3.Database("./src/models/database.db", sqlite3.OPEN_READWRITE, (error) =>{
        if(error){
            console.log(error.message)
            return
        }
    
        const id = req.params.id
        db.serialize( () =>{
            db.run("DELETE FROM usuarios WHERE id = ?", [id], (error) =>{
                if(error){
                    console.log('erro ao deletar', error)
                    return res.status(404).json({
                        error: true,
                        code: 404,
                        message: 'Erro ao tentar deletar'
                    })
                }
                return res.status(200).json({
                    success: true,
                    code: 200,
                    message: 'Usuario deletado com sucesso'
                })
            })
        })
        db.close( (error) =>{
            if(error){
                console.log(error.message)
            }
        })
    })
}
export const updateUser = (req, res) =>{
    const db = new sqlite3.Database("./src/models/database.db", sqlite3.OPEN_READWRITE, (error) =>{
        if(error){
            console.log(error.message)
            return
        }
        const body = req.body
        db.serialize( () =>{
            db.run("UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?", [body.nome, body.email, body.senha, body.id], (error) =>{
                if(error){
                    console.log(error.message)
                    return res.status(404).json({
                        error: true,
                        code: 404,
                        message: 'Erro ao tentar atualizar'
                    })
                }
                return res.status(200).json({
                    success: true,
                    code: 200,
                    message: 'Usuario atualizado com sucesso'
                })
            })
        })
        db.close( (error) =>{
            if(error){
                console.log(error.message)
            }
        })
    })
}