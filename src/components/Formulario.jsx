import {useState, useEffect} from 'react'
import Error from './Error'



const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

    const [nombre, setNombre]=useState('')
    const [propietario, setPropietario]=useState('')
    const [email, setEmail]=useState('')
    const [fecha, setFecha]=useState('')
    const [sintomas, setSintomas]=useState('')

    const [error, setError] = useState(false)


    useEffect(()=>{
        const {nombre, propietario, email, fecha, sintomas}=paciente
        if(Object.keys(paciente).length>0){
            setNombre(nombre)
            setPropietario(propietario)
            setEmail(email)
            setFecha(fecha)
            setSintomas(sintomas)
        }
    },[paciente])

    const generarId = ()=>{
        const random = Math.random().toString(36).substr(2)
        const fecha = Date.now().toString(36)
        return fecha + random
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        //VAlidacion del formulario

        if([nombre, propietario, email,fecha,sintomas].includes('')){
            //console.log('Vacios');
            setError(true)
            return
        }

        setError(false)

        ///Objeto de Paciente
        const objetoPaciente={
            nombre, 
            propietario, 
            email,
            fecha,
            sintomas
        }

        if(paciente.id){
            //Editando el registro
            objetoPaciente.id=paciente.id
            const pacienteActualizado = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)  
            
            setPacientes(pacienteActualizado)
            setPaciente({})

        }else{
            //Nuevo Registro
            objetoPaciente.id=generarId()
            setPacientes([...pacientes, objetoPaciente])
        }

        

        //reiniciar el form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')    

    }
    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {''} <span className="text-indigo-600 font-bold ">Administralos</span></p>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">

                {error && <Error><p>Todos los campos son obligatorios </p></Error>}

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota </label>
                    <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type={'text'} placeholder='Nombre de la Mascota' id="mascota" value={nombre} onChange={e=>setNombre(e.target.value)}/>
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario </label>
                    <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type={'text'} placeholder='Nombre del Propietario' id="propietario" value={propietario} onChange={e=>setPropietario(e.target.value)}/>
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email </label>
                    <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type={'email'} placeholder='Email contacto propietario' id="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta </label>
                    <input className="border-2 w-full p-2 mt-2" type={'date'}  id="atla" value={fecha} onChange={e=>setFecha(e.target.value)}/>
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Sintomas </label>
                    <textarea id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los Sintomas" value={sintomas} onChange={e=>setSintomas(e.target.value)}/>
                </div>

                <input type={'submit'} className=' bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 hover:cursor-pointer transition-all' value={paciente.id ? 'Guardar Cambios' : 'Agregar Paciente'}/>
            </form>
        </div>
    )
}

export default Formulario