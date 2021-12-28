import graphene
from tweets import schema
from profiles import schema as profiles_schema
import graphql_jwt

class Query(schema.Query, profiles_schema.Query, graphene.ObjectType):
    pass

class Mutation(schema.Mutation, profiles_schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)