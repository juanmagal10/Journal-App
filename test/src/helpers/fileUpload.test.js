import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'djshmigq8',
    api_key: '278686235887765',
    api_secret: '-o5kkTbdhIyAGcYQVYYW3uJiaSM',
    secure:true
})

describe('Pruebas en el fileUpload',  () => {
  test('debe de subir correctamente el archivo a cloudinary ', async () => {
      const imageUrl = 'https://images.unsplash.com/photo-1601625463687-25541fb72f62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
      
    const resp = await fetch(imageUrl)
      const blob = await resp.blob();
      const file = new File([blob], 'photo.jpg');

    const url=await fileUpload(file)
      expect(typeof url).toBe('string')

      const segments = url.split('/');
      const imgId = segments[segments.length - 1].replace('.jpg', '');
      const cloudResponse = await cloudinary.api.delete_resources('journal/' + [imgId], {
          resource_type:'image'
      });

      console.log({cloudResponse})
  })
    
    test('debe retornar null', async () => {
        
        const file = new File([], 'photo.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null)
    })
    

  
})
