## **MODÜL EKLEME**

1.Öncelikle sitenize JSON:API modülünü aktif etmeniz gerekmektedir. Yüklediğiniz modülün ayarları Configuration altında Web Services bölümüne gelecektir. Gelen JSON:API ‘nin üstüne tıklayınız.
Karşınıza 2 seçenek gelmektedir. Eğer sadece veri çekecekseniz ilk seçeneği , veri çekip veri yollayacak, güncelleyecek veya silecekseniz ikinci seçeneği seçiniz.

2.HTTP BASİC Authentication modülünü aktif ediniz.

3.Daha sonra drupal/sites klasörü altında bulunan default.services.yml dosyasını kopyalayarak adını services.yml olarak değiştirip içerisinde bulunan cors.config ayarlarını aşağıdaki gibi yapılandırınız.

```cors.config:
 enabled: false
 # Specify allowed headers, like 'x-allowed-header'.
 allowedHeaders: []
 # Specify allowed request methods, specify ['*'] to allow all possible
ones.
 allowedMethods: []
 # Configure requests allowed from specific origins.
 allowedOrigins: ['*']
 # Sets the Access-Control-Expose-Headers header.
 exposedHeaders: false
 # Sets the Access-Control-Max-Age header.
 maxAge: false
 # Sets the Access-Control-Allow-Credentials header.
 supportsCredentials: false
 cors.config:
 enabled: true
 allowedHeaders: ['*']
 allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE']
 allowedOrigins: ['*']
 exposedHeaders: false
 maxAge: false
 supportsCredentials: false
```

**NOT**: React da axios kütüphanesini kullanırsanız yaptığınız isteklerde hata alma olasılığınız daha düşük olacaktır.

**GET**\
Bu metot ile veri çekebilirsiniz.
Sitenizde default olarak article content type'ı gelmektedir.
url/jsonapi/node/article path'inde datalarınız gözükecektir.Bu url'li axios.get() içine yapıştırınız. .then() içinde bir response dönecektir.Bu dönen response da istediğiniz contentleri çekebilirsiniz.Aşağıdaki örnek kodda gelen datalar dizi halinde geldiği için dizinin kaçıncı indisini almak istediğimizi belirttik.

```
      axios
        .get(
          'http://drupart.dev.com/user/jsonapi/node/article'
        )
        .then(response => {
          const title = response.data.data[1].attributes.title;
          const id= response.data.data[1].id;
          const data = {
            title: title,
            id:id
          };
          this.setState({ stateadi: data});
        });
    }
```

**POST**\
Bu metot ile JSON:API'nize veri gönderebilirsiniz.Bu metotu çalıştırabilmeniz için JSON-API ayarlarınızda **Accep all JSON:API create,read,update,and delete operations.** seçili olması gerekmektedir.\
Veri göndereceğimiz için ilk önce axios.create oluşturmanız gerekmektedir.Baseurl'e kendi url'inizin kullanıcı isminize kadar olan kısmını ekleyiniz.Ayrıca Headers kısmında aşağıdaki kodun ekli olması gerekmektedir.

```
Accept: application/vnd.api+json
Content-Type: application/vnd.api+json
Authorization:Basic YXBpOmFwaQ==
```

.post() içine /jsonapi/node/article ekleyin.Eklediğiniz url'i tırnak içine yazın ve tırnaktan sonra virgül koyarak göndermek istediğiniz datayı yazınız.Göndereceğiniz datanın formatı aşağıdaki gibi olmalıdır.

```
{
  "data": {
    "type": "node--article",
    "attributes": {
      "title": "My custom title",
      "body": {
        "value": "Custom value",
        "format": "plain_text"
      }
    }
  }
}
```

Eğer relationships'de göndermek istiyorsanız üstteki kodun davamına aşağıdaki kodu ekleyiniz.

```
 "relationships": {
      "uid": {
        "data": {
          "type": "user--user",
          "id": "{{UUID of user 1}}"
        }
      }
    }
  }
```

Aşağıdaki örnek kodu inceleyebilirsiniz.

```
 const instance = axios.create({
  baseURL: "http://drupal.dev.com/user",
  timeout: 1000,
  headers: {
   Authorization: `Basic ${base64.encode("admin:a")}`,
   Accept: "application/vnd.api+json",
   "Content-Type": "application/vnd.api+json",
  },
});

instance
  .post("/jsonapi/node/article", {
    data: {
      type: "node--article",
      attributes: {
        title: "title",
        body: {
          value: "body",
          format: "full_html",
        },
      },
    },
  })
  .then((response) => {
    console.log("response", response);
  })
  .catch((error) => {
    console.log("error", error);
  });
```

**PATCH**\
Bu metot ile datalarınızı güncelleyebilirsiniz. Post metodunda yaptığınız gibi ilk önce axios.create oluşturunuz.Baseurl'e kendi url'inizin kullanıcı isminize kadar olan kısmını ekleyiniz.Ayrıca Headers kısmında aşağıdaki kodun ekli olması gerekmektedir.

```
Accept: application/vnd.api+json
Content-Type: application/vnd.api+json
Authorization:Basic YXBpOmFwaQ==
```

Veri güncelleyeceğimiz için güncellenecek olan datanın id'sine ihtiyacımız var.Bu id'yi .patch() içine url'i yazdıktan sonra başına \$ işareti koyup {} içine yazınız ve virgül koyarak post metodunda yaptığımız gibi güncellenecek dataya yeni data göndeririz.Gönderilecek data aşağıdaki format gibi olmalıdır.

```

{
  "data": {
    "type": "node--article",
    "id": "{{article_uuid}}",
    "attributes": {
      "title": "My updated title"
    }
  }
}
```

Eğer relationships eklemek istiyorsanız devamına aşağıdaki gövdeyi ekleyiniz.

```
  "relationships": {
      "uid": {
        "data": {
          "type": "user--user",
          "id": "{{user_uuid}}"
        }
      }
    }
```

Aşağıdaki örnek kodu inceleyebilirsiniz.

```
 const title = this.state.updateTitle;
   const id= this.props.id;
    const instance = axios.create({
     baseURL:"http://drupart.dev.com/user",
     timeout:1000,
     headers:{
        Authorization: `Basic ${base64.encode("admin:a")}`,
        Accept: "application/vnd.api+json",
       "Content-Type": "application/vnd.api+json",
     },
   });
   instance
   .patch(`/jsonapi/node/article/${id}`,
 {
    data: {
        type: "node--article",
        id: id,
        attributes: {
            title: title,
        }
    }
}
)
.then((response) => {
    console.log("response", response);
  })
  .catch((error) => {
    console.log("error", error);
  });
```

**DELETE**\
Bu metot ile data silinir. Diğer metotlarda olduğu gibi öncelikle axios.create() oluşturunuz.Baseurl'e kendi url'inizin kullanıcı isminize kadar olan kısmını ekleyiniz.Ayrıca Headers kısmında aşağıdaki kodun ekli olması gerekmektedir.

```
Content-Type: application/vnd.api+json
Authorization:Basic YXBpOmFwaQ==
```

Diğer motolardan farklı olarak bu metotda Accep eklemiyoruz.\
Datayı silmek için id'sine ihtiyacımız var. .delete() içine url yazdıktan sonra başına \$ koyup {} içine datanın id'sini yazınız. .then() ile bir response dönecektir eğer dönen response görmek isityorsanız console yazdırabilirsiniz.\
Aşağıya incelemeniz için örnek kod bırakılmıştır.

```
 const instance = axios.create({
  baseURL: "http://drupal-dev.com/user",
  timeout: 1000,
  headers: {
    Authorization: `Basic ${base64.encode("admin:a")}`,
    "Content-Type": "application/vnd.api+json",
  },
});
instance
  .delete(`/jsonapi/node/aticle/${id}`)
  .then((response) => {
    console.log("response", response);
  })
  .catch((error) => {
    console.log("error", error);
  });
```
