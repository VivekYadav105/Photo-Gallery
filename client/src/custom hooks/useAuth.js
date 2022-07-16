function useAuth(){
    const [user,setUser] = useState(sessionStorage.getItem("user")||{})
    
}