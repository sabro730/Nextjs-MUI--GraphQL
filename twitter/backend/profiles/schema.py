import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required

from .models import Profile
from django.contrib.auth.models import User

class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile

class Query(graphene.ObjectType):
    profiles = graphene.List(ProfileType)
    # ppl_following = graphene.List(ProfileType)

    @staticmethod
    def resolve_profiles(self, info):
        user = User.objects.get(id=info.context.user.id)
        profiles = Profile.objects.exclude(id=user.profile.id).exclude(id__in=user.profile.following.all())
        return profiles

    # TODO
    # @staticmethod
    # def resolve_ppl_following(self, info):
    #     user = User.objects.get(id=info.context.user.id)
    #     following = user.profile.following.all()
    #     return following


class follow_profile(graphene.Mutation):
    class Arguments:
        user_id = graphene.Int(required=True)

    profile = graphene.Field(ProfileType)

    @login_required
    def mutate(self, info, user_id):
        user = User.objects.get(id=user_id)
        profile = Profile.objects.get(id=info.context.user.profile.id)
        profile.following.add(user)
        return follow_profile(profile=profile)

class Mutation(graphene.ObjectType):
    follow_profile = follow_profile.Field()
