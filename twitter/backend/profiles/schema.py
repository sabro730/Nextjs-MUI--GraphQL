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
    ppl_following = graphene.List(ProfileType)

    @staticmethod
    def resolve_profiles(self, info):
        user = User.objects.get(id=info.context.user.id)
        profiles = Profile.objects.exclude(id=user.id).exclude(id__in=user.profile.following.all())
        return profiles

    @staticmethod
    def resolve_ppl_following(self, info):
        user = User.objects.get(id=info.context.user.id)
        following = user.profile.following.all()
        return following


class follow_profile(graphene.Mutation):
    class Arguments:
        profile_id = graphene.Int(required=True)

    profile = graphene.Field(ProfileType)

    @login_required
    def mutate(self, info, profile_id):
        user = User.objects.get(id=info.context.user.id)
        profile = Profile.objects.get(id=profile_id)
        user.profile.following.add(profile)
        return follow_profile(profile=profile)

class Mutation(graphene.ObjectType):
    follow_profile = follow_profile.Field()
