import sqlalchemy
#import mySQLdb
import pymysql
sqlalchemy.__version__

#----

from sqlalchemy import create_engine
engine = create_engine('mysql+pymysql:///:memory:', echo=True)

#----

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

#----

from sqlalchemy import Column, Integer, String
class User(Base):
	__tablename__ = 'users'

	id = Column(Integer, primary_key=True)
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

ed_user = User(name='ed', fullname='Ed Jones', password='edspassword')
ed_user.name
ed_user.password

#---- Got here the first time



#our_user = session.query(User).filter_by(name='ed').first() # doctest:+NORMALIZE_WHITESPACE
#our_user

#---- Foreign Key Stuff

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Address(Base):
	__tablename__ = 'addresses'
	id = Column(Integer, primary_key=True)
	email_address = Column(String, nullable=False)
	user_id = Column(Integer, ForeignKey('users.id'))
	user = relationship("User")

	def __repr__(self):
		return "<Address(email_address='%s')>" % self.email_address

Base.metadata.create_all(engine)



from sqlalchemy.orm import sessionmaker
Session = sessionmaker(bind=engine)

session = Session()
session.add(ed_user)

our_user = session.query(User).filter_by(name='ed').first() # doctest:+NORMALIZE_WHITESPACE

print(our_user)






