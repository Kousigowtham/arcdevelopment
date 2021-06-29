import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBpdSmNrdok5ByXu0rEXKKilDnTrFvVxrk",
    authDomain: "blogsite-f8e97.firebaseapp.com",
    projectId: "blogsite-f8e97",
    storageBucket: "blogsite-f8e97.appspot.com",
    messagingSenderId: "163065435499",
    appId: "1:163065435499:web:9f2ded5e35f7d3af69682e"
  };

  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  export const db= firebase.firestore();
  export const auth=firebase.auth();

  export const createUserProfileDocument= async (userAuth, additionalData)=>{

    if(!userAuth) return ;

    const userRef= db.doc(`users/${userAuth.uid}`);
    const userSnap= await userRef.get();

    if(!userSnap.exists){
      const {email} = userAuth;
      const createdAt = new Date();
     try{
       await userRef.set({
        email,
        createdAt,
        ...additionalData
      });
    }
    catch(error){
      console.log("error while creating user", error.message);
    }
    }

    return userRef;
  }

export const getWriterList = async ()=>{

   const userSnap = await db.collection('users').get();

     return userSnap.docs.map(doc=> doc.data()).filter(x=>x.userRole==='ContentWriter' && (x.deleted === false || x.deleted === undefined))
        

}

export const getBlobsByUser = async (userId) =>{

    const BlogRef =  db.collection(`users/${userId}/Blogs`);
    const BlogSnap = await BlogRef.get();
    if(!BlogSnap.docs.length > 0){
        return null
    }
    return BlogSnap.docs.map((doc,index)=> ({ ...doc.data(), docId: userId, BlogName: `Blog${index+1}`})).filter(x=>x.deleted === false || x.deleted === undefined)  
}

export const getAllBlobs =  async ()=>{

  const UserRef =  db.collection('users');

   const UserSnap= await UserRef.get()
   
   if(UserSnap != null)
   {
     return  UserSnap.docs.map(doc=>
      getBlobsByUser(doc.id)
    )
  }
}



export const saveWriter= async (writer,currentUser)=>{
  const ModifiedAt = new Date();
  var ModifyingWriterRef= "";
  const userSnap = await db.collection('users').get();
  
  
  userSnap.docs.forEach(doc=>{
      if(doc.data().email=== writer.email)
      ModifyingWriterRef = doc;
  })

  await db.doc(`users/${ModifyingWriterRef.id}`).set({...writer, ModifiedAt , ModifiedBy : currentUser.email});

}

export const deleteWriter = async (writer, currentUser) =>{

  const ModifiedAt = new Date();
  var ModifyingWriterRef= "";
  const userSnap = await db.collection('users').get();
  
  
  userSnap.docs.forEach(doc=>{
      if(doc.data().email=== writer.email)
      ModifyingWriterRef = doc;
  })

  await db.doc(`users/${ModifyingWriterRef.id}`).set({...writer, deleted: true,  ModifiedAt , ModifiedBy : currentUser});

}

export const saveBlog= async(blog,currentUser)=>{
  const ModifiedAt = new Date();
  
  await db.doc(`users/${blog.docId}/Blogs/${blog.BlogName}`).set({...blog, ModifiedAt , ModifiedBy : currentUser.email});

}

export const deleteBlog = async (blog, currentUser) =>{

  const ModifiedAt = new Date();

  await db.doc(`users/${blog.docId}/Blogs/${blog.BlogName}`).set({...blog, deleted: true,  ModifiedAt , ModifiedBy : currentUser.email});

}



export const createBlogForUser= async (userId, Blogs, state) =>{

    if(Blogs === null){
      const createdAt = new Date();

        await db.doc(`users/${userId}/Blogs/Blog1`).set({
        BlogTitle: state.blogTitle,
        BlogDescription : state.blogDesc,
        createdAt:createdAt,


      })
    }
      else{
        const length=Blogs.length+1;
        const createdAt = new Date();

        await db.doc(`users/${userId}/Blogs/Blog${length}`).set({
        BlogTitle: state.blogTitle,
        BlogDescription : state.blogDesc,
        createdAt:createdAt,
      })
    }

}


  export default firebase;