/*
    var [testlist, setTestlist] = useState({});
    useEffect(() => {
        axios.get("http://localhost:5000/users/id/61e3be6042bb223a2f20a325/checklist/61edc11d4acf3cdb46935a1a")
        .then(
            function(res) {
                setTestlist(res.data);
            }
        )
    }, []);

    console.log(testlist)
    */

    /*
    if (user.checklists) {
        console.log('----------DELETE CHECKLIST----------');
        try {
            ChecklistDataService.deleteChecklist('61ed9fb22a2b795af855e7fd', '61e3be6042bb223a2f20a327');
            console.log(5);
        }
        catch {
            console.log("Failed delete")
        }
    }
    */
    /*
    if (user.checklists) {
        console.log('----------CREATE CHECKLIST-----------');
        try {
            ChecklistDataService.createChecklist(
                {
                    user_id: user._id,
                    name: "new checklist",
                    items: [
                        {
                            text: "we did it",
                            status: true
                        }
                    ]
                }
            );
            console.log(5);
        }
        catch {
            console.log("Failed create")
        }
    }
    */

    /*
    if (user.checklists && Object.keys(user.checklists).length==3) {
        console.log('----------UPDATE CHECKLIST-----------');
        let thischecklist = user.checklists[2];
        thischecklist.items.map(item => (
            item.text = 'updated'
        ))
        try {
            console.log(user.checklists[2]);
            ChecklistDataService.updateChecklist(
                {
                    _id: '61edc11d4acf3cdb46935a1a',
                    user_id: user._id,
                    name: thischecklist.name,
                    items: thischecklist.items
                }
            )
        }
        catch {
            console.log("Failed update")
        }
    }
    */
    /*
    if (user.checklists) {
        console.log('----------CREATE TASK-----------');
        try {
            TaskDataService.createTask(
                {
                    user_id: user._id,
                    checklist_id: "61edc11d4acf3cdb46935a1a",
                    test: "new task!",
                    status: false
                }
            );
            console.log("task created!?");
        }
        catch {
            console.log("Failed create task");
        }
    }
    */