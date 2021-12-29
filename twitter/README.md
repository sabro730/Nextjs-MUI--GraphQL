# Twitter platform
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![NextJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

Twitter is a microblogging platform where users post “tweets” which are restricted to 140 characters. The tweets are stored in a database and can be retrieved by any user.

Check the [Project Setup](./SETUP.md) for running the code locally.

## Implemented functionalities of Twitter:

- [x] A user should be able to sign up / log in
- [x] Users can tweet about anything they like with restrictions of 140 chars
- [x] Show all the tweets of people sorted by the latest tweet on top
- [x] Support for TweetDelete, TweetUpdate APIs in the backend
- [x] Custom 404 Error page
- [x] Users can follow each other
- [x] Show tweets based on the users following

## Todo

- [ ] Improve the design
- [ ] Make design responsive

## Navigations

- Before you start make sure that django table is migrated and the superuser is created.
- The user is created, logged in via the built-in authentication system and then the user is redirected to the home page. 
- Go to the [http://localhost/](http://localhost/) to see the Signin/Signup.
- Signup and signin to see the tweets.
- Go to the [http://localhost/api/admin](http://localhost/api/admin) to see the Django Admin panel.
- Go to the [http://localhost/api/graphql/](http://localhost/api/graphql/) to access GraphiQL playground.
- After signing in, you can see the following:
  - **Feeds** - shows the tweets of following users
  - **People** - people button in the sidebar, shows the people that user can follow
  - **Home** - home button in the sidebar, shows the tweets of the user
  - **New Tweet** - new tweet button in the sidebar, shows the text input to tweet
  - **Logout** - logout button in the sidebar, logs out the user

## Misc

**1. What technologies are used to build out the platform?**

I have a pretty good experience with the tech stack mentioned below and already had a [starter kit](https://github.com/yeganathan18/django-nextjs-starter-kit) for the same so cloned and started building out the platform. The whole platform has been dockerized which makes the both deployment and development process easy.

#### The tech stack used:

- ReactJS/NextJS
- Tailwind CSS
- GraphQL
- Python/Django
- PostgreSQL
- Docker (served in Nginx using gunicorn)

Frontend - Used Material UI components in the ReactJS for faster UI development.

**2. Schema of the database?**

django.contrib.auth.models

**User model**
| Field        | Type          |
| :--------    | :----         |
| id           | AutoField     |
| date_joined  | DateTimeField |
| email        | EmailField    |
| first_name   | CharField     |
| is_active    | BooleanField  |
| is_staff     | BooleanField  |
| is_superuser | BooleanField  |
| last_login   | DateTimeField |
| last_name    | CharField     |
| password     | CharField     |
| username     | CharField     |


**Tweet model**

| Field        | Type          |
| :--------    | :----         |
| id           | AutoField     |
| user         | ForeignKey    |
| description  | CharField     |
| created_at   | DateTimeField |


**Profile model**

| Field        | Type            |
| :--------    | :----           |
| id           | AutoField       |
| user         | ForeignKey      |
| following    | ManyToManyField |

#### How it works?

Authentication is done via django's built-in authentication system. When every user signs up, a profile instance is also created for the same user in the backend by django signals. Profile is used to store the following user list. The user can follow other users and the tweets of the users they follow are shown in the feed. The Tweet model is used to store the tweets of the user.



**3. What function/API that will return all the tweets**

API resolver function

```python
class Query(graphene.ObjectType):
    tweets = graphene.List(TweetType)

    @login_required
    def resolve_tweets(self, info):
        profiles = Profile.objects.filter(id__in=info.context.user.profile.following.all())
        followingUsers = User.objects.filter(profile__in=profiles)
        return Tweet.objects.filter(Q(user_id__in=followingUsers) | Q(user=info.context.user)).order_by("-created_at")
```

> **Note:** `login_required` decorator is used to restrict the API to only logged in users.

GraphQL API

```graphql
{
  tweets {
    id
    description
    createdAt
    user {
      id
      username
    }
  }
}
```

> Tweets query returns data in json based on the users that the user is following and the user itself.

**4. How much can the system built scale up to? What is the limiting
factors of the system and when will it start failing?**

I'm not sure about the scale up/failing cases and the system is not designed to scale up to a large number of users. The system is designed to scale up to a small number of users.

As I mentioned above, the whole system is dockerized and the deployment process is easy.

**5. BONUS**

As i mentioned already, the frontend uses materail ui and has been customised to make it look better. Implementation of tweet textbox and feed has been done. We can type our tweet and press the submit button that will send the request to publish this Tweet and update the feed.