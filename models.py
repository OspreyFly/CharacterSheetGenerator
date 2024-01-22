from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)


class User(db.Model):
    """User in the system."""

    __tablename__ = "user"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    username = db.Column(
        db.Text,
        nullable=False,
        unique=True,
    )

    password = db.Column(
        db.Text,
        nullable=False,
    )

    @classmethod
    def signup(cls, username, password):
        """Sign up user.

        Hashes password and adds user to system.
        """

        hashed_pwd = bcrypt.generate_password_hash(password).decode("UTF-8")

        user = User(
            username=username,
            password=hashed_pwd,
        )

        db.session.add(user)
        return user

    @classmethod
    def authenticate(cls, username, password):
        """Find user with `username` and `password`.

        This is a class method (call it on the class, not an individual user.)
        It searches for a user whose password hash matches this password
        and, if it finds such a user, returns that user object.

        If can't find matching user (or if password is wrong), returns False.
        """

        user = cls.query.filter_by(username=username).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False


class CharacterFeat(db.Model):
    __tablename__ = "characterfeat"
    character_id = db.Column(
        db.Integer, db.ForeignKey("characters.id"), primary_key=True
    )
    feat_id = db.Column(db.Integer, db.ForeignKey("feats.id"), primary_key=True)


class CharacterSpell(db.Model):
    __tablename__ = "characterspell"
    character_id = db.Column(
        db.Integer, db.ForeignKey("characters.id"), primary_key=True
    )
    spell_id = db.Column(db.Integer, db.ForeignKey("spells.id"), primary_key=True)


class CharacterProficiencies(db.Model):
    __tablename__ = "characterproficiencies"
    character_id = db.Column(
        db.Integer, db.ForeignKey("characters.id"), primary_key=True
    )
    proficiencies_id = db.Column(
        db.Integer, db.ForeignKey("proficiencies.id"), primary_key=True
    )


class CharacterClasses(db.Model):
    __tablename__ = "characterclasses"
    character_id = db.Column(
        db.Integer, db.ForeignKey("characters.id"), primary_key=True
    )
    classes_id = db.Column(db.Integer, db.ForeignKey("classes.id"), primary_key=True)


class Characters(db.Model):
    __tablename__ = "characters"
    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), unique=True)
    feats = db.relationship(
        "Feats", secondary=CharacterFeat, back_populates="characters"
    )
    spells = db.relationship(
        "Spells", secondary=CharacterSpell, back_populates="characters"
    )
    proficiencies = db.relationship(
        "Proficiencies", secondary=CharacterProficiencies, back_populates="characters"
    )
    classes = db.relationship(
        "Classes", secondary=CharacterClasses, back_populates="characters"
    )
    charactername = db.Column(db.String(100), nullable=False, unique=True)
    race = db.Column(db.String(100), nullable=False)
    characterlvl = db.Column(db.Integer, nullable=False)
    proficiency = db.Column(db.Integer, nullable=False)
    AC = db.Column(db.Integer, nullable=False)
    speed = db.Column(db.Integer, nullable=False)
    HPmax = db.Column(db.Integer, nullable=False)
    HDtotal = db.Column(db.Integer, nullable=False)
    STR = db.Column(db.Integer, nullable=False)
    CON = db.Column(db.Integer, nullable=False)
    DEX = db.Column(db.Integer, nullable=False)
    INT = db.Column(db.Integer, nullable=False)
    WIS = db.Column(db.Integer, nullable=False)
    CHA = db.Column(db.Integer, nullable=False)
    acrobatics = db.Column(db.Integer, nullable=False)
    animalhandling = db.Column(db.Integer, nullable=False)
    arcana = db.Column(db.Integer, nullable=False)
    athletics = db.Column(db.Integer, nullable=False)
    deception = db.Column(db.Integer, nullable=False)
    history = db.Column(db.Integer, nullable=False)
    insight = db.Column(db.Integer, nullable=False)
    intimidation = db.Column(db.Integer, nullable=False)
    medicine = db.Column(db.Integer, nullable=False)
    nature = db.Column(db.Integer, nullable=False)
    perception = db.Column(db.Integer, nullable=False)
    performance = db.Column(db.Integer, nullable=False)
    persuasion = db.Column(db.Integer, nullable=False)
    religion = db.Column(db.Integer, nullable=False)
    sleightofhand = db.Column(db.Integer, nullable=False)
    stealth = db.Column(db.Integer, nullable=False)
    survival = db.Column(db.Integer, nullable=False)
    passiveperception = db.Column(db.Integer, nullable=False)


class Feats(db.Model):
    __tablename__ = "feats"
    id = db.Column(
        db.Integer,
        primary_key=True,
    )
    feat_name = db.Column(db.String, nullable=False, unique=True)
    characters = db.relationship(
        "Characters", secondary=CharacterFeat, back_populates="feats"
    )


class Spells(db.Model):
    __tablename__ = "spells"
    id = db.Column(
        db.Integer,
        primary_key=True,
    )
    spell_name = db.Column(db.String, nullable=False, unique=True)
    characters = db.relationship(
        "Characters", secondary=CharacterSpell, back_populates="spells"
    )


class Proficiencies(db.Model):
    __tablename__ = "proficiencies"
    id = db.Column(
        db.Integer,
        primary_key=True,
    )
    skill_name = db.Column(db.String, nullable=False)
    expertise = db.Column(db.Boolean, nullable=False)
    characters = db.relationship(
        "Characters", secondary=CharacterProficiencies, back_populates="proficiencies"
    )


class Classes(db.Model):
    __tablename__ = "classes"
    id = db.Column(
        db.Integer,
        primary_key=True,
    )
    class_name = db.Column(db.String, nullable=False, unique=True)
    class_lvl = db.Column(db.Integer, nullable=False)
    characters = db.relationship(
        "Characters", secondary=CharacterClasses, back_populates="classes"
    )
