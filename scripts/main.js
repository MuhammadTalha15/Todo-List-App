
window.addEventListener('load', ()=> {

        const form_validator = document.getElementById('form-inpt-cnt');
        const main_input_field = document.getElementById('usr-inpt-cont-cnt');
        const tasks_parent = document.getElementById('data-cnt');

        const loadTasksFromLocalStorage = () => {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const task = localStorage.getItem(key);
                if (task) {
                    createUserData(task);
                }
            }
        }
            

            const createUserData = (taskContent) => { 

                const user_created_div = document.createElement('div');
                    user_created_div.classList.add('usr-crtd-dta-cnt');
    
                const task_input_holder = document.createElement('input');
                    task_input_holder.classList.add('todo-usr-data');
                    task_input_holder.setAttribute("readonly", "readonly");
                    task_input_holder.value = taskContent;
    
                const data_content_editor = document.createElement('button');
                    data_content_editor.innerText = 'Edit';
                    data_content_editor.classList.add('edit', 'btn');

                const data_content_deleter = document.createElement('button');
                    data_content_deleter.innerText = 'Delete';
                    data_content_deleter.classList.add('delete', 'btn');


                // APPENDING THE ELEMENTS TO THE DOM

                tasks_parent.appendChild(user_created_div);
                    user_created_div.appendChild(task_input_holder);
                    user_created_div.appendChild(data_content_editor);
                    user_created_div.appendChild(data_content_deleter);

                data_content_editor.addEventListener('click', ()=>{
                    if (data_content_editor.innerText.toLowerCase() == 'edit') {
                        data_content_editor.innerText = 'Save';
                        task_input_holder.removeAttribute("readonly");
                        task_input_holder.focus();
                        task_input_holder.style.color = '#8d108b';
                    }
                    else{
                        data_content_editor.innerText = 'Edit';
                        task_input_holder.setAttribute("readonly", "readonly");
                        task_input_holder.style.color = '#f0f0f0';
                    }

                });

                data_content_deleter.addEventListener('click', ()=>{
                    user_created_div.remove();
                    updateLocalStorage();
                });


                main_input_field.value = '';
            }

            
            
            const updateLocalStorage = () => {
                const tasks = document.querySelectorAll('.todo-usr-data')
                localStorage.clear();
                tasks.forEach((task, index)=>{
                    localStorage.setItem(index + 1, task.value);
                })
            }

            loadTasksFromLocalStorage();

        form_validator.addEventListener('submit', (e)=>{
            e.preventDefault();

            const task = main_input_field.value.trim();
            if (task !== '') {
                createUserData(task);
                main_input_field.value = '';
                updateLocalStorage();
            }
        })

});

