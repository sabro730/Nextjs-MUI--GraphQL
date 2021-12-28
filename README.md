# Tasks

## About the tasks

I tried completing the whole task in 2-3days of time and since the time limit is short, I focused on the functionalities > design/performance, overall I think the tasks are pretty good.

## autoFill component

Created a ReactJS controlled autoFill component that uses props to pass in the data and the selected value.

#### Implemented

- [x] It should be a controlled component.
- [x] No self-state. Should only use props.

Check out the component here - [autoFill](./autoFill)

## Twitter platform

Twitter is a microblogging platform where users post “tweets” which are restricted to 140 characters. The tweets are stored in a database and can be retrieved by any user.

#### Implemented functionalities of Twitter:

- [x] A user should be able to sign up / log in
- [x] Users can tweet about anything they like with restrictions of 140 chars
- [x] Show all the tweets of people sorted by the latest tweet on top
- [x] Support for TweetDelete, TweetUpdate APIs in the backend
- [x] Custom 404 Error page
- [x] Users can follow each other
- [x] Show tweets based on the users following

#### Todo

- [ ] Improve the UI, make it responsive
- [ ] Support for unfollowing

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

