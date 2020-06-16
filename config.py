class Config(object):
    """
    configurations here are common across all environments
    """


class DevelopmentConfig(Config):
    """
    Development configurations
    """

    DEBUG = True



class ProductionConfig(Config):
    """
    Production configurations
    """

    DEBUG = False

app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}