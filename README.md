# Tasks

## autoFill component

Created a ReactJS controlled autoFill component that uses props to pass in the data and the selected value.

#### Implemented

- [x] It should be a controlled component.
- [x] No self-state. Should only use props.

Check out the component here - [autoFill](./autoFill)


## Twitter platform

Twitter is a microblogging platform where users post “tweets” which are restricted to 140 characters. The tweets are stored in a database and can be retrieved by any user.

#### Implemented functionalities of Twitter:

- [x]  A user should be able to sign up / log in
- [x]  Users can tweet about anything they like with restrictions of 140 chars
- [x]  Show all the tweets of people sorted by the latest tweet on top
- [x]  Support for TweetDelete, TweetUpdate APIs in the backend
- [x]  Custom 404 Error page

#### Todo

- [ ]  Users should be able to follow each other
- [ ]  Show tweets based on the users following
- [ ]  Support for TweetUpdate and TweetDelete in the UI
- [ ]  Support for the profile page

### Misc

**1. What technologies are used to build out the platform?**

I have a pretty good experience with the tech stack mentioned below and already had a [starter kit](https://github.com/yeganathan18/django-nextjs-starter-kit) for the same so cloned and started building out the platform. The whole platform has been dockerized which makes the both deployment and development process easy.

##### The tech stack used:

- ReactJS/NextJS
- Tailwind CSS
- GraphQL
- Python/Django
- PostgreSQL
- Docker (served in Nginx using gunicorn)

Frontend - Used Material UI components in the ReactJS for faster UI development. 

**2. Schema of the database?**

**3. What function/API that will return all the tweets**

API Function
```python
class Query(graphene.ObjectType):
    tweets = graphene.List(TweetType, id=graphene.Int())
    user = graphene.Field(UserType)

    @login_required
    def resolve_tweets(self, info, id=None):
        user = info.context.user
        if id:
            return Tweet.objects.filter(id=id)
        return Tweet.objects.all().order_by("-created_at")

```

GraphQL API
```graphql
{
  tweets{
    id
    description
    createdAt
    user{
      id
      username
    }
  }
}
```

**4. How much can the system built scale up to? What is the limiting
factors of the system and when will it start failing?**


