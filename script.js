let taskId = 0;
    function allowDrop(ev) {
      ev.preventDefault();
    }
    function drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    }
    function drop(ev) {
      ev.preventDefault();
      const data = ev.dataTransfer.getData("text");
      const target = ev.target.closest(".column").querySelector(".task-list");
      target.appendChild(document.getElementById(data));
    }
    function addTask(text) {
      const input = document.getElementById("taskInput");
      const taskText = text || input.value.trim();
      if (!taskText) return;
      const task = document.createElement("div");
      task.className = "task";
      task.draggable = true;
      task.id = "task" + taskId++;
      task.ondragstart = drag;
      const span = document.createElement("span");
      span.textContent = taskText;
      const delBtn = document.createElement("button");
      delBtn.textContent = "✖";
      delBtn.onclick = () => task.remove();
      task.appendChild(span);
      task.appendChild(delBtn);
      document.getElementById("backlog").appendChild(task);
      if (!text) input.value = "";
    }
    document.getElementById("fileInput").addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        const lines = e.target.result.split("\n");
        lines.forEach(line => {
          if (line.trim()) addTask(line.trim());
        });
      };
      reader.readAsText(file);
    });