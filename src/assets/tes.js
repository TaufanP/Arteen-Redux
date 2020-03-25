
 {/* // constructor(props){
  //   super(props)
  //   this.state = {
  //     produk: [],
  //     name: '',
  //     description: '',
  //     price: '',
  //     stock: '',
  //     id_category: '',
  //     image: null,
  //     show: false,
  //     success: 0,
  //     errLogin: 0,
  //     search: '',
  //     idDelete: 0
  //   }
  // }

  // showModal = e => {this.setState({show: true})}
  // showModal = e => {this.setState({show: !this.state.show})}

  // getProduct(){
  //   axios.get(URL_STRING + 'product',{headers:{'x-access-token': localStorage.getItem('token')}})
  //   .then(res =>{
  //     const data = res.data.result
  //     this.setState({produk:data})
  //   })
  //   .catch(err => console.log(err))
  // }

  // getProductSearch = (search)  => {
  //   if(search === ''){
  //     this.getProduct();
  //   }else{
  //     axios.get(URL_STRING + 'product/search/' + search ,{headers:{'x-access-token': localStorage.getItem('token')}})
  //     .then(res =>{
  //       const data = res.data.result
  //       this.setState({produk:data})
  //       console.log(search)
  //     })
  //     .catch(err => console.log(err))      
  //   }
  // }

  // handleSearch = e => {
  //   if(e.key === "Enter"){
  //     e.preventDefault();
  //     this.setState(
  //       {search: e.target.value},
  //       () => this.getProductSearch(this.state.search)
  //     )
  //   }
  // }

  // handleLogout = e => {
  //   e.preventDefault();
  //   localStorage.clear();
  //   this.props.history.push('/')
  // }

  // handleDelete = (id) =>{
  //   this.setState({idDelete : id})
  //   axios.delete(URL_STRING + 'product/' + id ,{headers:{'x-access-token': localStorage.getItem('token')}})
  //   .then(this.forceUpdate())
  // }

  // handleChange = e => { 
  //   this.setState({[e.target.name] : [e.target.value]})
  // }

  // handleChangeImage = e => {
  //   this.setState({image: e.target.files[0]})
  // }

  // handleSubmit = async (event) => {
  //   event.preventDefault();
  //   let data = new FormData();
  //   data.append('image', this.state.image);
  //   data.append('name', this.state.name);
  //   data.append('description', this.state.description);
  //   data.append('price', this.state.price);
  //   data.append('stock', this.state.stock);
  //   data.append('id_category', this.state.id_category);
  //   console.log(this.state.id_category)
  //   await axios.post(URL_STRING + 'product/', data,{headers:{'content-type': 'multipart/form-data', 'x-access-token': localStorage.getItem('token')}})
  //     .then(res => {this.setState({success: 1})})
  //     .catch(error => {console.log(error);this.setState({success: 2})})
  // }

  // handleUpdate = async (event) => {
  //   event.preventDefault();
  //   console.log(this.state)
  // }

  // componentDidMount(){
  //   if(localStorage.getItem('token') === null){
  //     this.props.history.push('/loginWarn')
  //   }
  //   this.getProduct();
  // }
   */}