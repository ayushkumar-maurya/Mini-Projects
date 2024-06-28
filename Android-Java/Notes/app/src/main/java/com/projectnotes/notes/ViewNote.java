package com.projectnotes.notes;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NavUtils;
import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

public class ViewNote extends AppCompatActivity {
    private EditText viewNoteTitle, viewNoteText;
    private ImageButton save, delete;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_note);

        Intent intent = getIntent();
        int id = intent.getIntExtra("noteId", -1);
        String viewTitle = intent.getStringExtra("noteTitle");
        String viewText = intent.getStringExtra("noteText");

        viewNoteTitle = findViewById(R.id.viewNoteTitle);
        viewNoteText = findViewById(R.id.viewNoteText);
        viewNoteTitle.setText(viewTitle);
        viewNoteText.setText(viewText);

        save = findViewById(R.id.save);
        save.setOnClickListener(v -> {
            String title = viewNoteTitle.getText().toString();
            String text = viewNoteText.getText().toString();
            DbHandler handler = new DbHandler(this, "notesdb", null, 1);
            if(title.length() > 0 || text.length() > 0) {
                handler.updateNote(id, title, text);
                Toast.makeText(this, "Note saved!", Toast.LENGTH_SHORT).show();
            }
            else {
                handler.deleteNote(id);
                NavUtils.navigateUpFromSameTask(this);
            }
        });

        delete = findViewById(R.id.delete);
        Dialog confirm_delete = new Dialog(this);
        confirm_delete.setContentView(R.layout.confirm_delete);
        confirm_delete.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        confirm_delete.setCancelable(false);
        Button confirm_del = confirm_delete.findViewById(R.id.confirm_del);
        Button cancel = confirm_delete.findViewById(R.id.cancel);

        delete.setOnClickListener(v -> {
            confirm_delete.show();
        });
        confirm_del.setOnClickListener(v -> {
            DbHandler handler = new DbHandler(this, "notesdb", null, 1);
            handler.deleteNote(id);
            NavUtils.navigateUpFromSameTask(this);
        });
        cancel.setOnClickListener(v -> {
            confirm_delete.dismiss();
        });
    }
}