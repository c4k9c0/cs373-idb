import sqlalchemy
sqlalchemy.__version__

#----

from sqlalchemy import create_engine, Sequence
engine = create_engine('sqlite:///:memory:', echo=True)

#----

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

#----

from sqlalchemy import Column, Integer, String
class User(Base):
	__tablename__ = 'users'

	id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
	name = Column(String)
	fullname = Column(String)
	password = Column(String)

	def __repr__(self):
		return "<User(name='%s', fullname='%s', password='%s')>" % (self.name, self.fullname, self.password)

#----

User.__table__

#Base.metadata.create_all(engine)
#Base.metadata.drop_all(engine) if you are dumb like me and mess up

#----

user0 = User(name='Charlie', fullname='Charlie Cox', password='edspassword')
#ed_user.name
#ed_user.password

#---- Got here the first time



#our_user = session.query(User).filter_by(name='ed').first() # doctest:+NORMALIZE_WHITESPACE
#our_user

#---- Foreign Key Stuff

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Address(Base):
	__tablename__ = 'addresses'
	id = Column(Integer, Sequence('address_id_seq'), primary_key=True)
	email_address = Column(String, nullable=False)
	user_id = Column(Integer, ForeignKey('users.id'))
	user = relationship("User")

	def __repr__(self):
		return "<Address(email_address='%s')>" % self.email_address

Base.metadata.create_all(engine)



from sqlalchemy.orm import sessionmaker
Session = sessionmaker(bind=engine)

session = Session()
session.add(user0)
session.commit()


our_user = session.query(User).filter_by(name='Charlie').first()

print(our_user)
print(our_user.id)

user1 = User(name='Andy', fullname='Andy Medina', password='edspassword')
user2 = User(name='Andy', fullname='Andy Dickson', password='edspassword')

session.add(user1)
session.add(user2)

session.commit()

print(our_user.id)

our_user = session.query(User).filter_by(fullname='Andy Dickson').first()

add1 = Address(email_address="charliecox17@yahoo.com",user_id=user1.id,user = user1)
session.add(add1)
session.commit()

our_user = session.query(User).filter_by(name='Andy')

print(our_user)
#print(our_user.id)

#print(add1.user)






