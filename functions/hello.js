exports.handler = async function(event, context){
  return{
    statusCode : 200,
    body: JSON.stringify({
      name: 'SUSUFANA',
      age:500,
      email:'susufana@gamil.com'
    })
  }
}