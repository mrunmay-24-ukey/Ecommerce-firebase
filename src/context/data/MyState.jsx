import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import { QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FireBaseConfig';
import { toast } from 'react-toastify';


const MyState = (props) => {
    // data 
    // dark and light mode logic 
    const [mode, setMode] = useState('light');
    const [loading, setLoading] = useState(false)


    const toggleMode = () => {
        if(mode=='light'){
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17 ,24 , 39)'
        }
        else{
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
        
    }


    const [products, setProducts] = useState({
        title:null,
        price: null,
        imageUrl:null, 
        category:null,
        description:null,
        time:Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month:"short",
                day:"2-digit",
                year:'numeric',
            }
        )
    })
    
    const addProduct =async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error('Please fill all fields')
          }    
          setLoading(true);

          try {
            
            const productRef = collection(fireDB , "products"); // (DBname , collectionName)
            await addDoc(productRef , products) // add products in Firebase
            toast.success("Product added Successfully")
            
            setTimeout(() => {
                window.location.href = '/dashboard';

            }, 800)

            getProductData();
            setLoading(false)



          } catch (error) {
                console.log(error);
                setLoading(false)
          }
        }


        const [product, setProduct] = useState([])

        const getProductData  = async () => {

            setLoading(true);
            try {
                const q = query(
                    collection(fireDB , 'products'),
                    orderBy('time')
                )

                const data = onSnapshot(q , (QuerySnapshot) => {
                    let productArray = [];
                    QuerySnapshot.forEach((doc) => {
                        productArray.push({...doc.data() , id:doc.id})
                    });
                    setProduct(productArray)
                    setLoading(false);
                })
                return () => data;
            } 
            catch (error) {
                
            }
        }

        useEffect(() => {
            getProductData();
        }, []);




        // update product function
        const editHandle = (item) => {
            setProducts(item)
          }
          // update product
          const updateProduct = async (item) => {
            setLoading(true)
            try {
              await setDoc(doc(fireDB, "products", products.id), products);
              toast.success("Product Updated successfully")
              getProductData();
              window.location.href = '/dashboard'
              setLoading(false)
              
            } catch (error) {
              setLoading(false)
              console.log(error)
            }
            // setProducts("")
          }
        
          const deleteProduct = async (item) => {
            setLoading(true)
            try {
              
              await deleteDoc(doc(fireDB, "products", item.id));
              toast.success('Product Deleted successfully')
              setLoading(false)
              getProductData()
            } catch (error) {
              toast.success('Product Deleted Falied')
              setLoading(false)
            }
          }
        
          
  return (
    <MyContext.Provider value={{mode , toggleMode , loading , setLoading ,products , setProducts , addProduct , product , editHandle , deleteProduct , updateProduct}}>
        {props.children}
    </MyContext.Provider>
  )
}

export default MyState