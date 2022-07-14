# README

## Life without gap


Life without gap is my second project as a student in General Assembly. It is a kind of yellow page website for helping disability and elder people. Users can sign up their own accounts and post all institution they recommend.
</br>

Institution's location can be found by google map in `Detail`, meanwhile users could send request to the institution or save all the information about the institution and send to users' phone.
</br>

>Welcome to [TRY](https://lwg1.herokuapp.com/) !

---------------------------------------------------------------

## Build With

* HTML5
* CSS3
* JavaScript
* GOOGLE map API
* Express
* Mongoose
* Bootstrap
---------------------------------------------------------------

## Screen Shot
![Screenshot](./media/Screen%20Shot%202022-07-14%20at%203.38.42%20pm.png)

![Screenshot](./media/Screen%20Shot%202022-07-14%20at%203.38.58%20pm.png)

![Screenshot](./media/Screen%20Shot%202022-07-14%20at%203.39.16%20pm.png)


## Highlight

In order to show the location of each institution, google map is added to the project.
>At the very beginning of the project, `<iframe>` is used to show the google map.

>The `src` of `<ifrane>` is made of  `place_id` and `API Key`

>`API Key` can be generated from [google map platform](https://developers.google.com/maps/documentation/javascript/get-api-key).

>`Node-geocoder` is used to convert a address to its specific `place_id`.
---------------------------------------------------------------

## More to improve

1. Update request function. When users quest , the information will be send to users' emails or phones automatically.

2. Update user's information. When users create accounts , it will show the profile of users and which institution the user has post.
---------------------------------------------------------------
