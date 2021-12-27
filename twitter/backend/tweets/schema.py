import graphene
from .models import Tweet
from graphene_django import DjangoObjectType, DjangoListField
from graphql_jwt.decorators import login_required
from django.contrib.auth import get_user_model


class TweetType(DjangoObjectType):
    class Meta:
        model = Tweet
        # fields = ("id", "title", "date")


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class Query(graphene.ObjectType):
    tweets = graphene.List(TweetType, id=graphene.Int())
    user = graphene.Field(UserType)

    @login_required
    def resolve_tweets(self, info, id=None):
        user = info.context.user
        if id:
            return Tweet.objects.filter(id=id)
        return Tweet.objects.all().order_by("-date")

    @login_required
    def resolve_user(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Login Required")
        return user


class CreateTweet(graphene.Mutation):
    tweet = graphene.Field(TweetType)

    class Arguments:
        description = graphene.String(required=True)

    @login_required
    def mutate(self, info, description):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not Loged in ! Login Now")
        tweet = Tweet(user=user, description=description)
        tweet.save()
        return CreateTweet(tweet=tweet)


class UpdateTweet(graphene.Mutation):
    tweet = graphene.Field(TweetType)

    class Arguments:
        id = graphene.Int(required=True)
        description = graphene.String(required=True)

    @login_required
    def mutate(self, info, id, description):
        user = info.context.user
        tweet = Tweet.objects.get(id=id)
        if user != tweet.user:
            raise Exception("It's Not Your Todo Data!!")
        tweet.description = description
        tweet.save()
        return UpdateTweet(tweet=tweet)


class DeleteTweet(graphene.Mutation):
    message = graphene.String()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        user = info.context.user
        tweet = Tweet.objects.get(id=id)
        if user != tweet.user:
            raise Exception("It's Not Your Todo !!")
        tweet.delete()
        return DeleteTweet(message=f"ID {id} id Deleted")


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, username, password, first_name, last_name):
        user = get_user_model()(username=username, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_tweet = CreateTweet.Field()
    update_tweet = UpdateTweet.Field()
    delete_tweet = DeleteTweet.Field()
    create_user = CreateUser.Field()
