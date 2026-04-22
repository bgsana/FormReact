import { useState, useMemo } from 'react'
import Select from 'react-select' // Biblioteca externa de select
import countryList from 'react-select-country-list' // Lista de países
import './MyForm.css'

const selectStyles = {
    control: (base, state) => ({
        ...base,
        background: state.isFocused ? 'rgba(160,124,255,0.05)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${state.isFocused ? 'rgba(160,140,255,0.45)' : 'rgba(255,255,255,0.09)'}`,
        borderRadius: '10px',
        minHeight: '42px',
        boxShadow: state.isFocused ? '0 0 0 3px rgba(160,124,255,0.12)' : 'none',
        cursor: 'pointer',
        transition: 'all 0.25s',
        '&:hover': {
            borderColor: 'rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.06)',
        },
    }),
    valueContainer: (base) => ({ ...base, padding: '0 14px' }),
    singleValue: (base) => ({
        ...base,
        color: '#e8e4ff',
        fontFamily: "'DM Mono', monospace",
        fontSize: '13px',
    }),
    placeholder: (base) => ({
        ...base,
        color: '#4a4568',
        fontFamily: "'DM Mono', monospace",
        fontStyle: 'italic',
        fontSize: '12px',
    }),
    input: (base) => ({
        ...base,
        color: '#e8e4ff',
        fontFamily: "'DM Mono', monospace",
        fontSize: '13px',
    }),
    menu: (base) => ({
        ...base,
        background: '#1c1430',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
    }),
    menuList: (base) => ({ ...base, padding: '6px' }),
    option: (base, state) => ({
        ...base,
        fontFamily: "'DM Mono', monospace",
        fontSize: '12px',
        borderRadius: '8px',
        cursor: 'pointer',
        color: state.isSelected ? '#a07cff' : '#8b84b0',
        background: state.isSelected
            ? 'rgba(160,124,255,0.25)'
            : state.isFocused
            ? 'rgba(160,124,255,0.12)'
            : 'transparent',
        transition: 'all 0.15s',
    }),
    indicatorSeparator: (base) => ({ ...base, background: 'rgba(255,255,255,0.09)' }),
    dropdownIndicator: (base) => ({ ...base, color: '#a07cff' }),
    clearIndicator: (base) => ({ ...base, color: '#8b84b0' }),
}

const MyForm = () => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [role, setRole] = useState("admin")
    const [birthDate, setBirthDate] = useState('');
    const [tel, setTel] = useState()
    const [country, setCountry] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [agreeTerms, setAgreeTerms] = useState(false)

    const options = useMemo(() => countryList().getData(), [])

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleBirthDate = (e) => {
        setBirthDate(e.target.value);
    };
    const handleTel = (e) => {
        setTel(e.target.value)
    }
    const handleBio = (e) => {
        setBio(e.target.value)
    }
    const handleRole = (e) => {
        setRole(e.target.value)
    }
    const handleCountry = (value) => {
        setCountry(value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const handleTerms = (e) => {
        setAgreeTerms(e.target.checked)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, email)

        //limpar os dados
        setName("")
        setEmail("")
        setBio("")
        setRole("")
        setBirthDate("")
        setCountry("")
        setLastName("")
        setPassword("")
        setShowPassword("")
        setTel("")
    }

    console.log(name, email, bio, role)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* htmlFor funciona tipo uma classe */}
                    <label htmlFor="name">Nome: </label>
                    <input type="text" name='name' placeholder='Digite o seu nome' onChange={(e) => setName(e.target.value)} value={name || ""} />

                    <label htmlFor="name">Sobrenome: </label>
                    <input type="text" name='sobrenome' placeholder='Digite o seu sobrenome' onChange={handleLastName} value={lastName || ""} />

                    <label htmlFor="name">Email: </label>
                    <input type="text" name='email' placeholder='Digite o seu email' onChange={handleEmail} value={email || ""} />

                    <label htmlFor="name">Data de nascimento: </label>
                    <input type="date" name='birthDate' placeholder='Digite sua data de nascimento' onChange={handleBirthDate} value={birthDate || ""} />

                    <label htmlFor="name">Telefone: </label>
                    <input type="tel" name='tel' placeholder="00 00000-0000" pattern="[0-9]{2} [0-9]{5}-[0-9]{4}" onChange={handleTel} value={tel || ""} />

                    <label htmlFor="name">País: </label>
                    <Select options={options} value={country} onChange={handleCountry} placeholder="Selecione um país..." isSearchable={true} styles={selectStyles} />

                </div>

                <label>
                    <span>Bio: </span>
                    <textarea name="bio" placeholder='Descrição do usuário' onChange={handleBio} value={bio || ""}></textarea>
                </label>

                <label htmlFor="">
                    <span>Função no site: </span>
                    <select name="role" onChange={handleRole} value={role}>
                        <option value="user">Padrão</option>
                        <option value="editor">Editar</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>

                <label htmlFor="password"><span>Senha: </span> </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type={showPassword ? "text" : "password"} name='password' placeholder='Digite sua senha' onChange={handlePassword} value={password || ""} />
                    <button type="button" onClick={togglePasswordVisibility} style={{ marginLeft: '-30px', border: 'none', background: 'none', cursor: 'pointer' }}>
                        {showPassword ? "👁️" : "🙈"}
                    </button>
                </div>
                <div className="checkbox-container">
                <input type="checkbox" name="terms" id="terms" onChange={handleTerms} checked={agreeTerms}/>
                <label htmlFor="terms">Aceito os termos e condições</label>
                </div>

                <input type="submit" value="Enviar" />
            </form>
        </div>
    )
}

export default MyForm