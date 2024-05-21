import { useState } from "react"
import "./login.css"
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../lib/firebase"
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url:""
    });

    const [loading, setLoading] = useState(false);

    const handleAvatar = e =>{
        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }

    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }

    const handleRegister = async e =>{
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar.file);

            await setDoc(doc(db, "users", response.user.uid), {
                username,
                email,
                password,
                avatar: imgUrl,
                id: response.user.uid,
                blocked: [],
            });

            await setDoc(doc(db, "userchats", response.user.uid), {
                chats: []
            });

            toast.success("Conta Criada! Voce pode logar agora!")
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    return <div className="login">
        <div className="item">
            <h2>Bem vindo de volta,</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Email" name="email"/>
                <input type="password" placeholder="Senha" name="password"/>
                <button disabled={loading}>{loading ? "Carregando" : "Entrar"}</button>
            </form>
        </div>
        <div className="separator"></div>
        <div className="item">
            <h2>Criar uma conta.</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" />
                    Enviar uma imagem
                </label>
                <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar} />
                <input type="text" placeholder="Usuário" name="username"/>
                <input type="text" placeholder="Email" name="email"/>
                <input type="password" placeholder="Senha" name="password"/>
                <button disabled={loading}>{loading ? "Carregando" : "Registrar"}</button>
            </form>
        </div>
    </div>
        

}

export default Login