import { createClient } from "@supabase/supabase-js"
import React from "react"
import { StyledRegisterVideo } from "./styles"

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues)

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value
            })
        },

        clearForm(){
            setValues({})
        }
    }
}

const PROJECT_URL = "https://ygvdjeuwqrxllehzxqmu.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmRqZXV3cXJ4bGxlaHp4cW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzExMzMsImV4cCI6MTk4Mzk0NzEzM30.BM3U6NF7o3pRaOmtZa7Kh3_MKIw2poKFfEnAGuRA7Wk"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export default function RegisterVideo () {
    const [formVisivel, setFormVisivel] = React.useState(false)
    const formCadastro = useForm({
        initialValues: { titulo: "", url: "" }
    })

    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>

            {formVisivel ?  
            <form onSubmit={(e) => {
                e.preventDefault()
                supabase.from("video").insert({
                    title: formCadastro.values.titulo,
                    url: formCadastro.values.url,
                    thumb: getThumbnail(formCadastro.values.url),
                    playlist: "jogos",
                })
                setFormVisivel(false)
                formCadastro.clearForm()
            }}>
                <div>
                    <button className="close-modal" onClick={() => setFormVisivel(false)}>
                        X
                    </button>
                    <input 
                        placeholder="Titulo do video" 
                        name="titulo"
                        value={formCadastro.values.titulo}
                        onChange= {formCadastro.handleChange}
                    />
                    
                    <input 
                        placeholder="URL" 
                        name="url"
                        value={formCadastro.values.url}
                        onChange={formCadastro.handleChange}
                    />
                    <button type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
            : null}
        </StyledRegisterVideo>
    )
}