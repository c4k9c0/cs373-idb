FILES :=                              \
    .travis.yml                       \
    .gitignore                        \
    apiary.apib                       \
    IDB1.log                          \
    models.html                       \
    app/models.py                         \
    app/tests.py                          \
    UML.pdf

check:
	@not_found=0;                                 \
	for i in $(FILES);                            \
	do                                            \
		if [ -e $$i ];                            \
		then                                      \
			echo "$$i found";                     \
		else                                      \
			echo "$$i NOT FOUND";                 \
			not_found=`expr "$$not_found" + "1"`; \
		fi                                        \
	done;                                         \
	if [ $$not_found -ne 0 ];                     \
	then                                          \
		echo "$$not_found failures";              \
		exit 1;                                   \
	fi;                                           \
	echo "success";

IDB1.log:
	git log > IDB1.log

IDB1.html: models.py
	pydoc3 -w models

test: app/tests.py
	python3 app/tests.py
	# coverage3 run    --branch app/tests.py > test_output.tmp 2>&1
	# coverage3 report -m  >> test_output.tmp
	# cat test_output.tmp