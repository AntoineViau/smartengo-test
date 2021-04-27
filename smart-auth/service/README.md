Relation entre Nest et Passport.
Au niveau authentification.

Le point de passage c'est la guard : 

  export class LocalAuthGuard extends AuthGuard('local') {}

Utilisée par le controller : 

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

Ici on créé LocalAuthGuard uniquement pour éviter d'identifier notre guard par une string en dur dans le code.
On aurait pu écrire : 

  @UseGuards(AuthGuard('local'))

Retenons que nous identifions une Passport Strategy par l'identifiant 'local'.
Ce fonctionnement par identifiant en string permet de créer autant de stratégies que l'on veut.
La 'local' est une built-in de Passport qui propose le classique login/password.

Donc, quand la route se prend un hit, la guard intervient.
Elle active la AuthGuard('local') de Passport.

Cette AuthGuard('local') est rattachée à l'implémentation de la stratégie qui est dans `local.strategy.ts` : 

  @Injectable()
  export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
      super({ usernameField: 'login' });
    }

    async validate(username: string, password: string): Promise<any> {
      const user = await this.authService.validateUser(username, password);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    }
  }

Ce que je n'arrive pas à comprendre c'est cette liaison.
Comment LocalStrategy est trouvé par la AuthGuard ?
Je devine qu'il se passe qqchose avec extends PassportStragy(Strategy)
Notamment parce que ce paramètre Strategy vient de `import { Strategy } from 'passport-local'`

Alors, effectivement...
Ce fameux extends va produire qqchose à la compilation du JS (pas du TS) au niveau du moteur JS.
Autrement dit, même si la classe LocalStrategy n'est pas instantiée, la classe parente PassportStrategy(Strategy) est quand même crée.
Et cette classe parente est abstraite avec l'obligation d'implémenter validate().

Mais surtout, la liaison se fait via la string 'local' qui est présente via le code importé par `import { Strategy } from 'passport-local'` !
Dans https://github.com/jaredhanson/passport-local/blob/master/lib/strategy.js on a `this.name = 'local'`

Ok, mind blow...

PassportStrategy(Strategy) va retourner une classe abstraite qui extends Strategy.
Pour rappel et pour insister : Strategy.name = 'local'.

Donc, automatiquement, notre class LocalStrategy va étendre Strategy, et donc contiendra 'local' !!!